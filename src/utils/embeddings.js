// In a production environment, replace this with a call to an embedding API like OpenAI, Cohere, etc.
// This is a simplified version for demonstration purposes

// Simple tokenizer - splits text into words and converts to lowercase
const tokenize = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
};

// Simple bag-of-words vectorizer
const vectorize = (tokens, vocabulary) => {
  const vector = new Array(vocabulary.length).fill(0);
  tokens.forEach(token => {
    const index = vocabulary.indexOf(token);
    if (index !== -1) {
      vector[index] += 1;
    }
  });
  return vector;
};

// Calculate cosine similarity between two vectors
const cosineSimilarity = (a, b) => {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
};

// Simple TF-IDF vectorizer class
class TfidfVectorizer {
  constructor() {
    this.vocabulary = [];
    this.idf = [];
  }
  
  // Fit the vectorizer to a corpus of documents
  fit(corpus) {
    // Build vocabulary
    const docFreq = {};
    const docCount = corpus.length;
    
    corpus.forEach(doc => {
      const tokens = new Set(tokenize(doc.text));
      tokens.forEach(token => {
        docFreq[token] = (docFreq[token] || 0) + 1;
      });
    });
    
    // Create vocabulary and IDF
    this.vocabulary = Object.keys(docFreq);
    this.idf = this.vocabulary.map(token => 
      Math.log((docCount + 1) / (docFreq[token] + 1)) + 1
    );
    
    return this;
  }
  
  // Transform a single document to TF-IDF vector
  transform(doc) {
    const tokens = tokenize(doc);
    const termFreq = {};
    let maxFreq = 0;
    
    // Count term frequencies
    tokens.forEach(token => {
      const index = this.vocabulary.indexOf(token);
      if (index !== -1) {
        termFreq[index] = (termFreq[index] || 0) + 1;
        maxFreq = Math.max(maxFreq, termFreq[index]);
      }
    });
    
    // Calculate TF-IDF
    const vector = new Array(this.vocabulary.length).fill(0);
    Object.entries(termFreq).forEach(([index, count]) => {
      const tf = 0.5 + (0.5 * count) / maxFreq; // Sublinear TF scaling
      vector[index] = tf * this.idf[index];
    });
    
    return vector;
  }
  
  // Fit and transform in one step
  fitTransform(corpus) {
    this.fit(corpus);
    return corpus.map(doc => this.transform(doc.text));
  }
}

// Export functions
module.exports = {
  tokenize,
  vectorize,
  cosineSimilarity,
  TfidfVectorizer
};
