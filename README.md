# Digital AI-based Crop Recommendation Platform

## Problem Statement 25030 - SIH 2025

A comprehensive digital platform designed to provide AI-powered crop recommendations to farmers, helping them make informed decisions about what crops to plant based on their specific farm conditions.

## 🎯 Project Overview

This platform addresses the critical need for data-driven farming decisions by providing:
- **AI-powered crop recommendations** based on soil type, weather, and farm conditions
- **Multi-language support** (English, Hindi, Local languages)
- **Mobile-first design** optimized for farmers' needs
- **Offline capability** for areas with poor connectivity
- **Real-time alerts** for weather warnings and farming tips

## 📱 Wireframes Overview

The platform includes 7 comprehensive wireframes designed with a farmer-friendly, mobile-first approach:

### 1. **Login / Register Page**
- **Features:**
  - Simple phone/email and password authentication
  - Language selection (English, Hindi, Local)
  - Toggle between login and registration modes
  - Offline mode indicator
- **Design Notes:** Large buttons, clear icons, minimal text for easy navigation

### 2. **Farmer Dashboard**
- **Features:**
  - Personalized welcome header with farmer name and village
  - Quick stats (past recommendations, active alerts)
  - Main action cards:
    - Get Crop Recommendation
    - My Past Recommendations  
    - Alerts & Reminders
    - Profile & Settings
  - Bottom navigation for easy access
- **Design Notes:** Card-based layout with color-coded borders for different functions

### 3. **Crop Recommendation Input Page**
- **Features:**
  - Input fields for farm data:
    - Farm Size (acres)
    - Soil Type (dropdown with common types)
    - Location (GPS or manual entry)
    - Previous Crop (optional)
  - AI Integration Port placeholder
  - Generate Recommendation button
- **Design Notes:** Form validation, GPS integration button, clear field labels

### 4. **Recommendation Result Page**
- **Features:**
  - List of recommended crops with:
    - Crop name and match percentage
    - Season and duration information
    - Short reasoning for recommendation
  - Action buttons for each crop:
    - View Details
    - Set Planting Reminder
  - AI Integration Port for backend model
- **Design Notes:** Score-based ranking, visual indicators, actionable buttons

### 5. **Crop Detail Page**
- **Features:**
  - Comprehensive crop information:
    - Description and ideal soil conditions
    - Best season and growth duration
  - Best Practices section:
    - Fertilizer tips with specific recommendations
    - Irrigation guidelines
    - Weather considerations
  - Action buttons: Add to Plan, Set Reminder
- **Design Notes:** Detailed information organized in sections with icons

### 6. **Alerts & Reminders Page**
- **Features:**
  - Priority-based alert system:
    - Weather warnings (high priority)
    - Pest/disease alerts (medium priority)
    - Planting reminders (low priority)
  - Quick stats dashboard
  - Weather summary with temperature and humidity
  - Mark as read functionality
- **Design Notes:** Color-coded priority system, weather integration

### 7. **Admin/Expert Dashboard**
- **Features:**
  - Extension officer portal with:
    - Upload crop database functionality
    - Manage farmer users
    - Send alerts to farmers
    - Crop analytics and trends
  - Statistics dashboard
  - AI Integration Port for backend management
- **Design Notes:** Administrative interface with data management capabilities

## 🎨 Design Principles

### Mobile-First Approach
- All wireframes designed for mobile screens (max-width: 480px)
- Touch-friendly buttons and navigation
- Responsive design that works on all devices

### Farmer-Friendly UI
- **Large buttons** and touch targets
- **Clear icons** for visual recognition
- **Minimal text** with essential information only
- **Color coding** for different functions and priorities
- **Simple navigation** with bottom tabs

### Accessibility Features
- High contrast colors for readability
- Large font sizes for older users
- Clear visual hierarchy
- Intuitive icon usage

## 🤖 AI Integration Points

Throughout the wireframes, you'll find **"AI Integration Port"** placeholders marked with 🤖 emoji. These indicate where the backend AI model will be integrated:

1. **Crop Recommendation Input** - Data collection for AI analysis
2. **Recommendation Results** - AI model output display
3. **Admin Dashboard** - Model training and database management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd crop-recommendation-platform

# Install dependencies
npm install

# Start the development server
npm start
```

### Viewing Wireframes
1. Start the development server
2. Navigate to `http://localhost:3000/wireframes`
3. Use the navigation buttons to switch between different wireframe screens

## 📱 Wireframe Navigation

The wireframes are accessible through a dedicated route that allows you to:
- **Switch between screens** using the top navigation
- **View mobile-optimized layouts** 
- **Test interactive elements** (buttons, forms, etc.)
- **See the complete user flow** from login to crop recommendations

## 🔧 Technology Stack

- **Frontend:** React.js with Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Styling:** Tailwind CSS for utility-first styling

## 📋 Key Features Implemented

### Core Functionality
- ✅ User authentication (login/register)
- ✅ Multi-language support framework
- ✅ Mobile-responsive design
- ✅ Offline mode indicators
- ✅ Navigation between screens

### AI Integration Ready
- ✅ Data collection forms
- ✅ Result display templates
- ✅ Admin management interface
- ✅ Placeholder integration points

### User Experience
- ✅ Intuitive navigation
- ✅ Clear visual hierarchy
- ✅ Touch-friendly interface
- ✅ Accessibility considerations

## 🎯 Next Steps

1. **Backend Development**
   - Implement AI/ML models for crop recommendation
   - Set up database for user and crop data
   - Create APIs for data exchange

2. **Additional Features**
   - Real-time weather integration
   - Push notifications for alerts
   - Offline data synchronization
   - Image recognition for crop identification

3. **Testing & Deployment**
   - User testing with farmers
   - Performance optimization
   - Production deployment

## 📞 Support

For questions or support regarding the wireframes or platform development, please contact the development team.

---

**Note:** These wireframes serve as the foundation for the Digital AI-based Crop Recommendation Platform. They are designed to be farmer-friendly, mobile-first, and ready for AI integration to provide intelligent crop recommendations to farmers across India.

