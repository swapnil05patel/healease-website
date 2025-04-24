
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Configure your Python backend URL here
const PYTHON_BACKEND_URL = "http://your-python-backend-url/api";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the form data
    const formData = await req.formData();
    const imageFile = formData.get('file');
    const language = formData.get('language') || 'en-IN';
    const medicalSystem = formData.get('medicalSystem') || 'Allopathy';
    
    if (!imageFile || !(imageFile instanceof File)) {
      throw new Error('No image file provided')
    }

    console.log("Forwarding image analysis request to Python backend");
    
    // Create a new FormData to send to the Python backend
    const pythonFormData = new FormData();
    pythonFormData.append("file", imageFile);
    pythonFormData.append("language", language.toString());
    pythonFormData.append("medicalSystem", medicalSystem.toString());
    
    const pythonResponse = await fetch(`${PYTHON_BACKEND_URL}/analyze-medical-image`, {
      method: 'POST',
      // No Content-Type header for FormData - browser sets it automatically with boundary
      body: pythonFormData
    });

    if (!pythonResponse.ok) {
      const errorData = await pythonResponse.json();
      throw new Error(errorData.message || "Python backend returned an error");
    }
    
    const analysis = await pythonResponse.json();
    console.log("Received image analysis from Python backend:", analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error("Error in analyze-medical-image:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
