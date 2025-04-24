
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowRight, Loader2, ServerCrash, Stethoscope, Heart } from "lucide-react";
import { analyzeSymptoms } from "@/lib/ai-service";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FEATURES } from "@/config/api-config";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [language, setLanguage] = useState(FEATURES.LANGUAGE_PREFERENCE);
  const [medicalSystem, setMedicalSystem] = useState("Allopathy");

  const handleAnalyzeSymptoms = async () => {
    if (symptoms.trim().length < 10) {
      toast.warning("Please provide more details about your symptoms");
      return;
    }
    
    setLoading(true);
    setApiError(null);
    setAnalysis(null); // Clear previous results
    
    try {
      const result = await analyzeSymptoms(symptoms, language, medicalSystem);
      console.log('Analysis result:', result); // Debug log
      if (!result || !result.possibleConditions) {
        throw new Error('Invalid response format from server');
      }
      setAnalysis(result);
      toast.success("Symptom analysis completed");
    } catch (error: any) {
      console.error("Error analyzing symptoms:", error);
      setApiError(error.message || "Failed to analyze symptoms. Please try again.");
      toast.error("Failed to analyze symptoms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-medical-lightblue bg-opacity-50 border-b">
        <CardTitle className="flex items-center text-medical-darkblue">
          <Stethoscope className="mr-2 h-5 w-5" />
          AI Symptom Checker
        </CardTitle>
        <CardDescription>
          Describe your symptoms in detail and our AI will analyze them with healthcare insights for India
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium mb-1 block">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-IN">English</SelectItem>
                <SelectItem value="hi-IN">हिंदी (Hindi)</SelectItem>
                <SelectItem value="ta-IN">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="te-IN">తెలుగు (Telugu)</SelectItem>
                <SelectItem value="bn-IN">বাংলা (Bengali)</SelectItem>
                <SelectItem value="mr-IN">मराठी (Marathi)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium mb-1 block">Medical System</label>
            <Select value={medicalSystem} onValueChange={setMedicalSystem}>
              <SelectTrigger>
                <SelectValue placeholder="Select Medical System" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Allopathy">Allopathy (Modern Medicine)</SelectItem>
                <SelectItem value="Ayurveda">Ayurveda</SelectItem>
                <SelectItem value="Homeopathy">Homeopathy</SelectItem>
                <SelectItem value="Unani">Unani</SelectItem>
                <SelectItem value="Siddha">Siddha</SelectItem>
                <SelectItem value="Yoga">Yoga & Naturopathy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Textarea
          placeholder="Describe your symptoms here... (e.g., 'I've had a headache for 3 days, with mild fever and fatigue')"
          className="medical-input min-h-[120px]"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        
        {apiError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        
        {analysis && (
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-medium text-medical-darkblue mb-2">Possible Conditions:</h4>
              <div className="space-y-2">
                {analysis.possibleConditions.map((condition: any, index: number) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md flex items-start
                      ${index === 0 ? 'bg-medical-lightgreen border border-medical-green' : 'bg-gray-50'}`}
                  >
                    <div className={`w-12 text-center font-bold ${index === 0 ? 'text-medical-green' : 'text-gray-500'}`}>
                      {condition.probability}%
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{condition.name}</div>
                      <div className="text-sm text-gray-600">{condition.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-medical-lightblue bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-medium text-medical-darkblue mb-2">Recommendation:</h4>
              <p>{analysis.recommendation}</p>
              
              {analysis.severity >= 7 && (
                <div className="mt-2 flex items-center text-medical-red">
                  <AlertCircle className="h-5 w-5 mr-1" />
                  <span className="font-medium">Seek immediate medical attention - Call 108 for emergency services</span>
                </div>
              )}
            </div>
            
            {FEATURES.ENABLE_AYUSH_RECOMMENDATIONS && analysis.ayushRecommendation && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-medical-darkblue mb-2 flex items-center">
                  <Heart className="h-4 w-4 mr-1 text-medical-green" />
                  AYUSH Recommendation:
                </h4>
                <p>{analysis.ayushRecommendation}</p>
              </div>
            )}
            
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm">
              <p>This is an AI-based symptom checker. Always consult with a qualified healthcare professional for proper diagnosis and treatment.</p>
              <p className="mt-1">For medical emergencies in India, call <strong>108</strong> or visit your nearest emergency department.</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button 
          onClick={handleAnalyzeSymptoms} 
          className="bg-medical-blue hover:bg-medical-darkblue"
          disabled={symptoms.trim().length < 10 || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Analyzing...
            </>
          ) : (
            <>
              Analyze Symptoms <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomChecker;
