
/**
 * Configuration for API services
 */

// Base URL for the Python AI backend service
export const AI_API_BASE_URL = "http://localhost:8000";

// Default timeout for API requests in milliseconds (adjusted for variable network conditions in India)
export const API_TIMEOUT = 45000; // 45 seconds

// Feature flags
export const FEATURES = {
  // Set to false to use mock data even when API is available
  USE_REAL_AI_API: true,
  
  // Enable/disable specific AI features
  ENABLE_SYMPTOM_ANALYSIS: true,
  ENABLE_IMAGE_ANALYSIS: true,
  ENABLE_HEALTH_DATA_ANALYSIS: true,
  
  // Connection settings (increased for Indian network conditions)
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000, // milliseconds
  
  // India-specific features
  ENABLE_AYUSH_RECOMMENDATIONS: true, // For Ayurvedic, Yoga, Unani, Siddha, and Homeopathy
  ENABLE_TELEMEDICINE: true,
  REGION: "india",
  LANGUAGE_PREFERENCE: "en-IN", // Default language (English-India)
  SUPPORT_REGIONAL_LANGUAGES: true,
  AVAILABLE_LANGUAGES: ["en-IN", "hi-IN", "ta-IN", "te-IN", "bn-IN", "mr-IN"], // English, Hindi, Tamil, Telugu, Bengali, Marathi
};

// API response types and structures
export const API_RESPONSE_FORMATS = {
  SYMPTOM_ANALYSIS: {
    version: "1.0",
    required_fields: ["possibleConditions", "recommendation", "severity", "ayushRecommendation"]
  },
  IMAGE_ANALYSIS: {
    version: "1.0",
    required_fields: ["diagnosis", "confidence", "differential", "recommendation", "urgency", "ayushRecommendation"]
  },
  HEALTH_DATA_ANALYSIS: {
    version: "1.0",
    required_fields: ["insights", "recommendations", "riskFactors", "lifestyleGuidance"]
  }
};

// India-specific healthcare settings
export const INDIA_HEALTHCARE_CONFIG = {
  emergencyNumber: "108", // Indian emergency medical service number
  nhpmHelpline: "14555", // National Health Portal of India helpline
  covidHelpline: "1075", // COVID-19 national helpline
  insuranceProgrammes: ["Ayushman Bharat", "CGHS", "ESI", "State Insurance Programs"],
  medicalSystemTypes: ["Allopathy", "Ayurveda", "Homeopathy", "Unani", "Siddha", "Yoga"]
};

