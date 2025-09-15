import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnosis } from '../context/DiagnosisContext';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ChevronRight,
  Search,
  Filter,
  Calendar as CalendarIcon
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const DiagnosisHistory = () => {
  const { diagnoses, isLoading, error, addFeedback } = useDiagnosis();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const filteredDiagnoses = diagnoses
    .filter(diagnosis => {
      const matchesSearch = JSON.stringify(diagnosis.diagnosis)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesFilter = filter === 'all' || 
        (filter === 'positive' && diagnosis.feedback === 'positive') ||
        (filter === 'negative' && diagnosis.feedback === 'negative');
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const handleFeedback = async (id, isPositive, comment = '') => {
    try {
      await addFeedback(id, isPositive ? 'positive' : 'negative', comment);
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    }
  };

  if (isLoading && !diagnoses.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <p>Error loading diagnosis history: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Diagnosis History</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search diagnoses..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="appearance-none bg-white pl-10 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Diagnoses</option>
              <option value="positive">Positive Feedback</option>
              <option value="negative">Needs Improvement</option>
            </select>
          </div>
        </div>
      </div>

      {filteredDiagnoses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No diagnoses found</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredDiagnoses.map((diagnosis) => (
              <li key={diagnosis.id} className="hover:bg-gray-50">
                <div 
                  className="px-4 py-4 sm:px-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === diagnosis.id ? null : diagnosis.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {diagnosis.diagnosis?.issue ? (
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 text-green-600" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-blue-600" />
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {diagnosis.diagnosis?.issue || 'Healthy Crop'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                          {formatDistanceToNow(new Date(diagnosis.timestamp), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transform transition-transform ${
                          expandedId === diagnosis.id ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {expandedId === diagnosis.id && (
                    <div className="mt-4 space-y-3">
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium mb-1">Recommendations:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diagnosis.diagnosis?.recommendations?.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          )) || 'No specific recommendations'}
                        </ul>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        <span className="text-sm text-gray-500">Was this helpful?</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeedback(diagnosis.id, true);
                          }}
                          className={`px-3 py-1 rounded-full text-sm flex items-center ${
                            diagnosis.feedback === 'positive' 
                              ? 'bg-green-100 text-green-800' 
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Yes
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const comment = prompt('How can we improve?');
                            if (comment) handleFeedback(diagnosis.id, false, comment);
                          }}
                          className={`px-3 py-1 rounded-full text-sm flex items-center ${
                            diagnosis.feedback === 'negative'
                              ? 'bg-red-100 text-red-800'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DiagnosisHistory;
