
// AI API service to connect to our Python backend

import { 
  mockAnalyzeSymptoms, 
  mockAnalyzeImage, 
  mockAnalyzeHealthData 
} from "./mock-ai";
import { FEATURES, API_TIMEOUT } from "@/config/api-config";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Helper function to handle API errors
const handleApiError = (error: any): never => {
  console.error("AI API Error:", error);
  throw new Error(error?.message || "An error occurred while communicating with the AI service");
};

// Helper for API requests with timeout and retries
const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs = API_TIMEOUT, retries = FEATURES.MAX_RETRIES) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  options.signal = controller.signal;
  
  try {
    const response = await fetch(url, options);
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    
    if (retries > 0) {
      console.log(`Retrying API call, ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, FEATURES.RETRY_DELAY));
      return fetchWithTimeout(url, options, timeoutMs, retries - 1);
    }
    
    throw error;
  }
};

// Function for symptom analysis
export const analyzeSymptoms = async (symptoms: string, language: string = "en-IN", medicalSystem: string = "Allopathy") => {
  // Use mock data if feature flag is disabled
  if (!FEATURES.USE_REAL_AI_API || !FEATURES.ENABLE_SYMPTOM_ANALYSIS) {
    console.log("Using mock symptom analysis data");
    return mockAnalyzeSymptoms(symptoms);
  }

  try {
    console.log('Sending symptoms to backend:', { symptoms, language, medicalSystem });
    const response = await fetch('http://127.0.0.1:8000/api/analyze-symptoms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ symptoms, language, medicalSystem })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received symptom analysis data:", data);
    return data;
  } catch (error) {
    // Fall back to mock data in case of connection issues
    console.warn("Using mock data due to API connection issue", error);
    toast.error("Could not connect to AI service. Using fallback analysis.");
    return mockAnalyzeSymptoms(symptoms);
  }
};

// Function for image analysis
export const analyzeImage = async (imageFile: File, language: string = 'en-IN', medicalSystem: string = 'Allopathy') => {
    try {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await fetch('http://127.0.0.1:8000/api/analyze-image', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Image analysis API error:', errorData);
            throw new Error(errorData.detail?.error || 'Failed to analyze image');
        }

        const data = await response.json();
        console.log('Image analysis response:', data);
        return data;
    } catch (error) {
        console.error('Error analyzing image:', error);
        throw error;
    }
};

// Function for health data analysis
export const analyzeHealthData = async (userId: string, language: string = "en-IN") => {
  // Use mock data if feature flag is disabled
  if (!FEATURES.USE_REAL_AI_API || !FEATURES.ENABLE_HEALTH_DATA_ANALYSIS) {
    console.log("Using mock health data analysis");
    return mockAnalyzeHealthData(userId);
  }

  try {
    const response = await supabase.functions.invoke('analyze-health-data', {
      body: { 
        userId,
        language,
        region: FEATURES.REGION
      }
    });

    if (response.error) {
      console.error("Health data analysis API error:", response.error);
      throw new Error(response.error.message || "Failed to analyze health data");
    }

    console.log("Received health data analysis:", response.data);
    return response.data;
  } catch (error) {
    // Fall back to mock data in case of connection issues
    console.warn("Using mock data due to API connection issue", error);
    toast.error("Could not connect to AI service. Using fallback analysis.");
    return mockAnalyzeHealthData(userId);
  }
};
