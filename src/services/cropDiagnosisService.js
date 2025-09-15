import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || 'demo_key');

// Function to convert a file to a GoogleGenerativeAI.Part object
function fileToGenerativePart(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Function to analyze crop image and get diagnosis
export const analyzeCropImage = async (imageFile, formData) => {
  try {
    // For demo purposes, return mock data if no API key is provided
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      return getMockDiagnosis(formData);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    // Prepare the prompt
    const prompt = `You are an expert agricultural scientist. Analyze this crop/plant image and provide a detailed diagnosis based on the following information:
    - Crop Type: ${formData.cropType}
    - Growth Stage: ${formData.growthStage}
    - Soil Type: ${formData.soilType}
    - Location: ${formData.location}
    - Additional Notes: ${formData.notes || 'None'}
    
    Provide a detailed analysis including:
    1. Likely issues (diseases, pests, nutrient deficiencies, etc.) with confidence levels
    2. Possible causes
    3. Recommended actions to address each issue
    4. Preventive measures for the future
    
    Format the response as a JSON object with the following structure:
    {
      "diagnosis": [
        {
          "issue": "string",
          "confidence": 0.0-1.0,
          "description": "string",
          "causes": ["string"],
          "recommendations": ["string"],
          "preventiveMeasures": ["string"]
        }
      ],
      "summary": "string",
      "confidence": 0.0-1.0
    }`;

    // Convert image to the required format
    const imagePart = await fileToGenerativePart(imageFile);
    
    // Generate content
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response (handle potential markdown code blocks)
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : text;
    
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Error parsing AI response as JSON, returning raw text:', e);
      return {
        diagnosis: [{
          issue: 'Analysis Result',
          confidence: 0.9,
          description: text,
          causes: [],
          recommendations: [],
          preventiveMeasures: []
        }],
        summary: 'Raw analysis result (formatting issue detected)',
        confidence: 0.9
      };
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    return getMockDiagnosis(formData);
  }
};

// Mock diagnosis for demo purposes
const getMockDiagnosis = (formData) => {
  const mockIssues = [
    {
      issue: 'Early Blight',
      confidence: 0.85,
      description: 'Circular brown lesions with concentric rings on leaves, often with a yellow halo.',
      causes: [
        'Fungal infection (Alternaria solani)',
        'Warm, humid conditions',
        'Poor air circulation'
      ],
      recommendations: [
        'Apply fungicide containing chlorothalonil or copper-based products',
        'Remove and destroy heavily infected leaves',
        'Ensure proper plant spacing for better air circulation'
      ],
      preventiveMeasures: [
        'Rotate crops away from tomatoes and other nightshades for 2-3 years',
        'Water at the base of plants to keep foliage dry',
        'Use disease-resistant varieties in future plantings'
      ]
    },
    {
      issue: 'Nitrogen Deficiency',
      confidence: 0.75,
      description: 'Older leaves turning yellow while veins remain green (interveinal chlorosis).',
      causes: [
        'Insufficient nitrogen in soil',
        'Poor soil health',
        'Excessive rainfall leaching nutrients'
      ],
      recommendations: [
        'Apply a balanced fertilizer (e.g., 10-10-10) at recommended rates',
        'Side-dress with compost or well-rotted manure',
        'Consider using a foliar nitrogen spray for quick absorption'
      ],
      preventiveMeasures: [
        'Conduct soil tests before planting season',
        'Use organic matter to improve soil health',
        'Practice crop rotation with nitrogen-fixing plants'
      ]
    }
  ];

  return {
    diagnosis: mockIssues,
    summary: `Based on the image and provided information, your ${formData.cropType} crop shows signs of Early Blight and possible Nitrogen Deficiency. The conditions in ${formData.location} may be contributing to these issues.`,
    confidence: 0.8,
    isMock: true
  };
};

// Function to save diagnosis to local history
export const saveDiagnosisToHistory = (diagnosisData) => {
  try {
    const history = JSON.parse(localStorage.getItem('cropDiagnosisHistory') || '[]');
    
    // Add new diagnosis to the beginning of the array
    const newHistory = [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...diagnosisData
      },
      ...history
    ];
    
    // Keep only the last 50 entries
    const limitedHistory = newHistory.slice(0, 50);
    
    // Save to localStorage
    localStorage.setItem('cropDiagnosisHistory', JSON.stringify(limitedHistory));
    
    return true;
  } catch (error) {
    console.error('Error saving diagnosis to history:', error);
    return false;
  }
};

// Function to get diagnosis history from local storage
export const getDiagnosisHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('cropDiagnosisHistory') || '[]');
  } catch (error) {
    console.error('Error getting diagnosis history:', error);
    return [];
  }
};

// Function to get a specific diagnosis by ID
export const getDiagnosisById = (id) => {
  try {
    const history = getDiagnosisHistory();
    return history.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Error getting diagnosis by ID:', error);
    return null;
  };
};
