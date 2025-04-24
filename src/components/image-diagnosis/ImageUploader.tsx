import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { AlertCircle, Upload, X, Loader2, ImageIcon, Camera, ArrowRight } from "lucide-react";
import { analyzeImage } from "@/lib/ai-service";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FEATURES } from "@/config/api-config";

interface AnalysisResult {
  possibleConditions: Array<{
    name: string;
    probability: number;
    description: string;
    visual_characteristics?: {
      patterns: string[];
      colors: string[];
      textures: string[];
    };
    recommendations?: {
      allopathy?: string;
      ayurveda?: string;
      homeopathy?: string;
    };
  }>;
  severity: number;
  urgency: 'low' | 'medium' | 'high';
  recommendation?: string;
}

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState(FEATURES.LANGUAGE_PREFERENCE);
  const [medicalSystem, setMedicalSystem] = useState("Allopathy");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.includes("image/")) {
      setError("Please upload an image file");
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size should be less than 10MB");
      toast.error("Image size should be less than 10MB");
      return;
    }

    setError(null);
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setAnalysis(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImageHandler = async (file: File) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeImage(file);
      console.log('Analysis result:', result);
      setAnalysis(result);
      
      // Show appropriate toast based on urgency
      if (result.urgency === 'high') {
        toast.error('High urgency condition detected. Please consult a healthcare provider immediately.');
      } else if (result.urgency === 'medium') {
        toast.warning('Condition detected. Consider consulting a healthcare provider.');
      } else {
        toast.success('Image analysis completed successfully.');
      }
    } catch (error: any) {
      console.error('Error analyzing image:', error);
      setError(error.message || 'Failed to analyze image');
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      toast.warning("Please upload an image first");
      return;
    }
    
    setLoading(true);
    setError(null);
    setAnalysis(null); // Clear previous results
    
    try {
      const result = await analyzeImage(imageFile, language, medicalSystem);
      console.log('Analysis result:', result); // Debug log
      
      // Validate result structure
      if (!result || !result.possibleConditions || result.possibleConditions.length === 0) {
        throw new Error('Invalid or empty image analysis result');
      }
      
      // Prepare the analysis result with detailed information
      const processedResult: AnalysisResult = {
        possibleConditions: result.possibleConditions.map(condition => ({
          name: condition.name,
          probability: condition.probability,
          description: condition.description || `Possible ${condition.name} detected`,
          visual_characteristics: condition.visual_characteristics,
          recommendations: condition.recommendations
        })),
        severity: result.severity,
        urgency: result.urgency,
        recommendation: result.recommendation || `Please consult a healthcare professional for ${result.possibleConditions[0]?.name || 'your condition'}`
      };
      
      setAnalysis(processedResult);
      
      // Show toast based on urgency
      if (processedResult.urgency === 'high') {
        toast.error('High urgency condition detected. Please consult a healthcare provider immediately.');
      } else if (processedResult.urgency === 'medium') {
        toast.warning('Condition detected. Consider consulting a healthcare provider.');
      } else {
        toast.success('Image analysis completed successfully.');
      }
    } catch (error: any) {
      console.error("Error analyzing image:", error);
      setError(error.message || "Failed to analyze image. Please try again.");
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReloadImage = () => {
    // Reset all state variables related to image upload and analysis
    setImageFile(null);
    setImage(null);
    setAnalysis(null);
    setError(null);
    setLoading(false);
    
    // Reset file input if it exists
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-medical-lightblue bg-opacity-50 border-b">
        <CardTitle className="flex items-center text-medical-darkblue">
          <Camera className="mr-2 h-5 w-5" />
          AI Image Diagnosis
        </CardTitle>
        <CardDescription>
          Upload a medical image (skin condition, X-ray, etc.) for AI analysis
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

        {!image ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-medical-blue bg-medical-lightblue bg-opacity-20"
                : "border-gray-300 hover:border-medical-blue"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              id="image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="font-medium text-gray-700">
                Drag and drop an image or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG - max 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <img
                src={image}
                alt="Uploaded image"
                className="max-w-full max-h-96 rounded-lg object-contain"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleReloadImage}
            >
              <X className="h-4 w-4" />
            </Button>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
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
                          {condition.probability.toFixed(1)}%
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="font-medium text-lg">{condition.name}</div>
                          <div className="text-sm text-gray-600 mb-2">{condition.description}</div>
                          
                          {/* Visual Characteristics */}
                          {condition.visual_characteristics && (
                            <div className="mt-2 bg-gray-100 p-2 rounded">
                              <h5 className="text-xs font-medium text-gray-700 mb-1">Visual Characteristics:</h5>
                              <div className="grid grid-cols-3 gap-2">
                                {condition.visual_characteristics.patterns && condition.visual_characteristics.patterns.length > 0 && (
                                  <div>
                                    <span className="text-xs font-semibold block mb-1">Patterns:</span>
                                    <ul className="text-xs list-disc list-inside">
                                      {condition.visual_characteristics.patterns.map((pattern: string, i: number) => (
                                        <li key={i}>{pattern}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {condition.visual_characteristics.colors && condition.visual_characteristics.colors.length > 0 && (
                                  <div>
                                    <span className="text-xs font-semibold block mb-1">Colors:</span>
                                    <ul className="text-xs list-disc list-inside">
                                      {condition.visual_characteristics.colors.map((color: string, i: number) => (
                                        <li key={i}>{color}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {condition.visual_characteristics.textures && condition.visual_characteristics.textures.length > 0 && (
                                  <div>
                                    <span className="text-xs font-semibold block mb-1">Textures:</span>
                                    <ul className="text-xs list-disc list-inside">
                                      {condition.visual_characteristics.textures.map((texture: string, i: number) => (
                                        <li key={i}>{texture}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Recommendations */}
                          {condition.recommendations && (
                            <div className="mt-2 bg-gray-100 p-2 rounded">
                              <h5 className="text-xs font-medium text-gray-700 mb-1">Treatment Recommendations:</h5>
                              <div className="space-y-1">
                                {condition.recommendations.allopathy && (
                                  <p className="text-xs"><span className="font-semibold">Allopathy:</span> {condition.recommendations.allopathy}</p>
                                )}
                                {condition.recommendations.ayurveda && (
                                  <p className="text-xs"><span className="font-semibold">Ayurveda:</span> {condition.recommendations.ayurveda}</p>
                                )}
                                {condition.recommendations.homeopathy && (
                                  <p className="text-xs"><span className="font-semibold">Homeopathy:</span> {condition.recommendations.homeopathy}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-medical-lightblue bg-opacity-20 p-4 rounded-lg">
                  <h4 className="font-medium text-medical-darkblue mb-2">Recommendation:</h4>
                  <p>{analysis.recommendation || `Based on the detected conditions, please consult a healthcare professional for further evaluation.`}</p>
                  
                  {analysis.severity >= 7 && (
                    <div className="mt-2 flex items-center text-medical-red">
                      <AlertCircle className="h-5 w-5 mr-1" />
                      <span className="font-medium">Seek immediate medical attention - Call 108 for emergency services</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm">
                  <p>This is an AI-based image diagnosis tool. Always consult with a qualified healthcare professional for proper diagnosis and treatment.</p>
                  <p className="mt-1">For medical emergencies in India, call <strong>108</strong> or visit your nearest emergency department.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50">
        {image && !analysis && (
          <Button 
            onClick={handleAnalyze} 
            className="bg-medical-blue hover:bg-medical-darkblue w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Analyzing...
              </>
            ) : (
              <>
                Analyze Image <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
        {image && (
          <Button 
            onClick={handleReloadImage} 
            className="bg-red-500 hover:bg-red-600 w-full mt-2"
          >
            Reload Image
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ImageUploader;
