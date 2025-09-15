// In a real app, this would call a machine learning API
const DIAGNOSIS_DATA = [
  {
    id: 'wheat-rust',
    name: 'Wheat Rust',
    scientificName: 'Puccinia triticina',
    crop: 'Wheat',
    symptoms: [
      'Small, circular yellow spots on leaves',
      'Orange-red pustules on the leaf surface',
      'Premature leaf drop',
    ],
    causes: [
      'Fungal infection',
      'Warm and humid conditions',
      'Dense crop canopy',
    ],
    solutions: {
      organic: [
        'Use rust-resistant varieties',
        'Apply neem oil spray',
        'Ensure proper spacing for air circulation',
      ],
      chemical: [
        'Apply fungicides containing propiconazole or tebuconazole',
        'Follow recommended application intervals',
      ],
    },
    prevention: [
      'Crop rotation',
      'Avoid excessive nitrogen fertilization',
      'Remove and destroy infected plant debris',
    ],
    severity: 'High',
    confidence: 0, // Will be set based on image analysis
  },
  // Add more diseases as needed
];

// Mock function to simulate image analysis
const analyzeCropImage = async (imageFile) => {
  // In a real app, this would send the image to a ML model API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock response - in reality, this would come from your ML model
      const mockDiagnosis = {
        ...DIAGNOSIS_DATA[0], // Using first disease as mock
        confidence: Math.floor(80 + Math.random() * 15), // 80-95% confidence
        timestamp: new Date().toISOString(),
      };
      resolve(mockDiagnosis);
    }, 1000);
  });
};

const getDiseaseInfo = (diseaseId) => {
  return DIAGNOSIS_DATA.find(disease => disease.id === diseaseId);
};

export { analyzeCropImage, getDiseaseInfo };
