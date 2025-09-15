# Crop Health Diagnosis Feature

This feature allows farmers to upload images of their crops or fields to receive AI-powered diagnoses for plant diseases, pests, and nutrient deficiencies.

## Features

- **Image Upload**: Upload photos of crops or fields for analysis
- **AI-Powered Analysis**: Uses Google's Generative AI to analyze crop health
- **Detailed Reports**: Get comprehensive reports including:
  - Identified issues with confidence levels
  - Possible causes
  - Recommended actions
  - Preventive measures
- **Multi-language Support**: Available in English, Hindi, Marathi, and Gujarati
- **Location-Based Weather**: Automatically fetches weather data for the farm location
- **History**: Saves previous diagnoses for future reference

## Setup Instructions

1. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Google Generative AI API key:
     ```
     REACT_APP_GEMINI_API_KEY=your_api_key_here
     ```
   - (Optional) Add your OpenWeatherMap API key for weather data:
     ```
     REACT_APP_WEATHER_API_KEY=your_weather_api_key_here
     ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

## How to Use

1. **Access the Feature**
   - Log in to the Farmer Dashboard
   - Click on the "Crop Health Diagnosis" card

2. **Upload an Image**
   - Take a clear photo of the affected plant or field area
   - Upload the image by dragging and dropping or clicking to select
   - Ensure the image shows the issue clearly

3. **Provide Crop Details**
   - Select the crop type from the dropdown
   - Choose the growth stage
   - Select the soil type
   - Enter or detect your location
   - (Optional) Add any additional notes

4. **Get Diagnosis**
   - Click "Analyze Crop"
   - Wait for the AI to process the image
   - View the detailed diagnosis and recommendations

## Troubleshooting

- **Image Not Uploading**: Ensure the image is less than 5MB and in JPG or PNG format
- **Poor Results**: Try taking a clearer photo with good lighting and focus
- **Location Detection**: If automatic detection fails, enter the location manually
- **API Errors**: Check your API keys and internet connection

## Demo Mode

If no API key is provided, the application will use sample data for demonstration purposes.

## Dependencies

- React 18+
- react-dropzone
- react-hook-form
- @hookform/resolvers
- yup
- @google/generative-ai
- lucide-react
- axios

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
