// Sample crop data - in a real app, this would come from an API
const CROP_DATA = [
  {
    id: 1,
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    season: ['Rabi'],
    temperature: { min: 15, max: 25 }, // Celsius
    rainfall: { min: 50, max: 100 }, // cm per year
    soilTypes: ['Loamy', 'Clay Loam', 'Silty Loam'],
    waterRequirement: 'Medium',
    duration: 120, // days
    yield: '40-60', // quintals/hectare
    benefits: [
      'Staple food crop',
      'High market demand',
      'Multiple varieties available',
    ],
    challenges: [
      'Prone to rust and smut diseases',
      'Sensitive to waterlogging',
    ],
    bestPractices: [
      'Use certified seeds',
      'Maintain proper spacing',
      'Monitor for pests regularly',
    ],
  },
  // Add more crops as needed
];

const getRecommendedCrops = async (locationData, userPreferences = {}) => {
  const { soilType, season, waterAvailability, farmSize } = userPreferences;
  
  // In a real app, this would be an API call to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter crops based on conditions
      const recommended = CROP_DATA.filter(crop => {
        const matchesSeason = !season || crop.season.includes(season);
        const matchesSoil = !soilType || crop.soilTypes.includes(soilType);
        return matchesSeason && matchesSoil;
      });
      
      // Add confidence score (simplified)
      const withConfidence = recommended.map(crop => ({
        ...crop,
        confidence: Math.floor(70 + Math.random() * 25), // 70-95% confidence
      }));
      
      // Sort by confidence
      resolve(withConfidence.sort((a, b) => b.confidence - a.confidence));
    }, 500);
  });
};

export { getRecommendedCrops };
