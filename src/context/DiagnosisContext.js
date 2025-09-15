import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
  saveDiagnosis, 
  getDiagnosis, 
  getUserDiagnoses, 
  findSimilarDiagnoses,
  updateDiagnosisFeedback 
} from '../services/diagnosisService';

const DiagnosisContext = createContext();

export const useDiagnosis = () => {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return {
    ...context,
    fetchDiagnoses: context.loadDiagnoses // Alias loadDiagnoses as fetchDiagnoses for backward compatibility
  };
};

export const DiagnosisProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [diagnoses, setDiagnoses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user's diagnosis history
  const loadDiagnoses = useCallback(async () => {
    if (!currentUser?.uid) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const userDiagnoses = await getUserDiagnoses(currentUser.uid);
      setDiagnoses(userDiagnoses);
      return userDiagnoses;
    } catch (err) {
      console.error('Failed to load diagnoses:', err);
      setError('Failed to load diagnosis history');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.uid]);

  // Get a single diagnosis by ID
  const getDiagnosisById = async (id) => {
    if (!id) return null;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const diagnosis = await getDiagnosis(id);
      if (!diagnosis) {
        throw new Error('Diagnosis not found');
      }
      return diagnosis;
    } catch (err) {
      console.error('Failed to fetch diagnosis:', err);
      setError('Failed to load diagnosis');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Save a new diagnosis
  const addDiagnosis = async (diagnosisData) => {
    if (!currentUser?.uid) {
      throw new Error('User not authenticated');
    }

    try {
      setIsLoading(true);
      const newDiagnosis = await saveDiagnosis({
        ...diagnosisData,
        userId: currentUser.uid
      });
      
      setDiagnoses(prev => [newDiagnosis, ...prev]);
      return newDiagnosis;
    } catch (err) {
      console.error('Failed to save diagnosis:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Find similar past diagnoses
  const findSimilar = async (query, limit = 3) => {
    if (!currentUser?.uid) return [];
    
    try {
      setIsLoading(true);
      return await findSimilarDiagnoses(query, currentUser.uid, limit);
    } catch (err) {
      console.error('Failed to find similar diagnoses:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Update diagnosis feedback
  const addFeedback = async (diagnosisId, feedback, comment = '') => {
    try {
      setIsLoading(true);
      const updated = await updateDiagnosisFeedback(diagnosisId, feedback, comment);
      
      setDiagnoses(prev => 
        prev.map(d => d.id === diagnosisId ? updated : d)
      );
      
      return updated;
    } catch (err) {
      console.error('Failed to update feedback:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load diagnoses on mount and when user changes
  useEffect(() => {
    loadDiagnoses();
  }, [loadDiagnoses]);

  const value = {
    diagnoses,
    isLoading,
    error,
    addDiagnosis,
    findSimilar,
    addFeedback,
    refreshDiagnoses: loadDiagnoses,
    fetchDiagnoses: loadDiagnoses, // Alias for backward compatibility
  };

  return (
    <DiagnosisContext.Provider
      value={{
        ...value,
        getDiagnosisById,
        loadDiagnoses,
        fetchDiagnoses: loadDiagnoses // Alias for backward compatibility
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};

export default DiagnosisContext;
