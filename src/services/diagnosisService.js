import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';
import { TfidfVectorizer, cosineSimilarity } from '../utils/embeddings';

const DB_NAME = 'CropAIDB';
const STORE_NAME = 'diagnoses';
const VECTOR_STORE = 'diagnosis_vectors';
const DB_VERSION = 1;

// Initialize IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('userId', 'userId');
        store.createIndex('fieldId', 'fieldId');
        store.createIndex('timestamp', 'timestamp');
      }
      if (!db.objectStoreNames.contains(VECTOR_STORE)) {
        db.createObjectStore(VECTOR_STORE, { keyPath: 'id' });
      }
    },
  });
};

let vectorizer = new TfidfVectorizer();
let isVectorizerTrained = false;

// Train the vectorizer with initial data
const trainVectorizer = async (diagnoses) => {
  const corpus = diagnoses.map(d => ({
    id: d.id,
    text: [
      d.diagnosis?.issue || '',
      ...(d.diagnosis?.recommendations || []),
      d.metadata?.notes || ''
    ].join(' ')
  }));
  
  vectorizer.fit(corpus);
  isVectorizerTrained = true;
};

// Generate embedding for text
const generateEmbedding = (text) => {
  if (!isVectorizerTrained) {
    // Return a simple hash-based vector if vectorizer isn't trained yet
    const hash = Array.from(text).reduce(
      (hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 
      0
    );
    return [Math.abs(hash % 1000) / 1000];
  }
  return vectorizer.transform(text);
};

// Save diagnosis to database
const saveDiagnosis = async (diagnosisData) => {
  const db = await initDB();
  const tx = db.transaction([STORE_NAME, VECTOR_STORE], 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const vectorStore = tx.objectStore(VECTOR_STORE);
  
  const id = uuidv4();
  const timestamp = new Date().toISOString();
  
  // Create diagnosis record
  const record = {
    id,
    userId: diagnosisData.userId,
    fieldId: diagnosisData.fieldId || null,
    imageUrl: diagnosisData.imageUrl || null,
    modelVersion: diagnosisData.modelVersion || '1.0.0',
    diagnosis: diagnosisData.diagnosis,
    metadata: diagnosisData.metadata || {},
    timestamp,
    feedback: null,
    feedbackComment: null,
    feedbackTimestamp: null
  };
  
  // Generate and store embedding for semantic search
  const searchText = [
    diagnosisData.diagnosis?.issue || '',
    ...(diagnosisData.diagnosis?.recommendations || []),
    diagnosisData.metadata?.notes || ''
  ].join(' ');
  
  const embedding = generateEmbedding(searchText);
  
  // Update vectorizer with new data if it's already been trained
  if (isVectorizerTrained) {
    vectorizer.fit([{ id: id, text: searchText }]);
  }
  
  // Save both records
  await store.add(record);
  await vectorStore.add({
    id,
    vector: embedding,
    text: searchText,
    timestamp
  });
  
  await tx.done;
  return { ...record, embedding };
};

// Get diagnosis by ID
const getDiagnosis = async (id) => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};

// Get all diagnoses for a user
const getUserDiagnoses = async (userId, limit = 20) => {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, 'userId', userId, limit);
};

// Similarity search using vector embeddings
const findSimilarDiagnoses = async (text, userId, limit = 5) => {
  const db = await initDB();
  const tx = db.transaction([STORE_NAME, VECTOR_STORE], 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const vectorStore = tx.objectStore(VECTOR_STORE);
  
  // Get all vectors for the user
  const allVectors = await vectorStore.getAll();
  
  // If vectorizer isn't trained yet, train it with existing data
  if (!isVectorizerTrained && allVectors.length > 0) {
    const allDiagnoses = await store.getAll();
    await trainVectorizer(allDiagnoses);
  }
  
  const queryVector = generateEmbedding(text);
  
  // Calculate cosine similarity
  const similarities = [];
  for (const item of allVectors) {
    const similarity = cosineSimilarity(queryVector, item.vector);
    similarities.push({ id: item.id, similarity });
  }
  
  // Sort by similarity and get top results
  const topMatches = similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
  
  // Get full diagnosis records
  const results = await Promise.all(
    topMatches.map(match => store.get(match.id))
  );
  
  return results.filter(Boolean);
};

// Update diagnosis feedback
const updateDiagnosisFeedback = async (id, feedback, comment = '') => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  const record = await store.get(id);
  if (!record) throw new Error('Diagnosis not found');
  
  const updated = {
    ...record,
    feedback,
    feedbackComment: comment,
    feedbackTimestamp: new Date().toISOString()
  };
  
  await store.put(updated);
  await tx.done;
  return updated;
};

export {
  saveDiagnosis,
  getDiagnosis,
  getUserDiagnoses,
  findSimilarDiagnoses,
  updateDiagnosisFeedback
};
