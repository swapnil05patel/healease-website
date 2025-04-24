
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
    const { symptoms, language, medicalSystem } = await req.json()
    
    // Forward the request to the Python backend
    console.log("Forwarding symptom analysis request to Python backend", { symptoms, language, medicalSystem });
    
    const pythonResponse = await fetch(`${PYTHON_BACKEND_URL}/analyze-symptoms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may add authentication headers here if needed
      },
      body: JSON.stringify({ 
        symptoms, 
        language, 
        medicalSystem 
      })
    });
    
    if (!pythonResponse.ok) {
      const errorData = await pythonResponse.json();
      throw new Error(errorData.message || "Python backend returned an error");
    }
    
    const analysis = await pythonResponse.json();
    console.log("Received symptom analysis from Python backend:", analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error("Error in analyze-symptoms:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
