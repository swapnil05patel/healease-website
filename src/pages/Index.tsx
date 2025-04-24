import React from "react";
import Header from "@/components/layout/Header";
import SymptomChecker from "@/components/symptom-checker/SymptomChecker";
import HealthMetricsCard from "@/components/dashboard/HealthMetricsCard";
import HealthTrendChart from "@/components/dashboard/HealthTrendChart";
import ImageUploader from "@/components/image-diagnosis/ImageUploader";
import LabTestBooking from "@/components/pathology/LabTestBooking";
import HospitalFinder from "@/components/hospitals/HospitalFinder";
import AIChatbot from "@/components/chatbot/AIChatbot";
import { Heart, Microscope, Pill, Stethoscope } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-medical-darkblue mb-2">HealWise AI Medical Assistant</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your personalized healthcare companion powered by artificial intelligence.
            Get disease predictions, track your health, and receive expert medical guidance.
          </p>
        </div>
        
        {/* Health Dashboard */}
        <div className="mb-8">
          <HealthMetricsCard />
        </div>
        
        {/* Health Trend Chart */}
        <div className="mb-8">
          <HealthTrendChart />
        </div>
        
        {/* Feature Tabs */}
        <Tabs defaultValue="symptoms" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="symptoms" className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Symptom Checker</span>
              <span className="sm:hidden">Symptoms</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Image Diagnosis</span>
              <span className="sm:hidden">Image</span>
            </TabsTrigger>
            <TabsTrigger value="lab" className="flex items-center">
              <Microscope className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Lab Tests</span>
              <span className="sm:hidden">Tests</span>
            </TabsTrigger>
            <TabsTrigger value="hospital" className="flex items-center">
              <Pill className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Hospital Finder</span>
              <span className="sm:hidden">Hospitals</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mb-6">
            <TabsContent value="symptoms">
              <SymptomChecker />
            </TabsContent>
            
            <TabsContent value="image">
              <ImageUploader />
            </TabsContent>
            
            <TabsContent value="lab">
              <LabTestBooking />
            </TabsContent>
            
            <TabsContent value="hospital">
              <HospitalFinder />
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Features Overview */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-medical-darkblue mb-6 text-center">
            How HealWise Helps You
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-medical-lightblue rounded-lg flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-medical-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Diagnosis</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your symptoms and provides accurate disease predictions and treatment suggestions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-medical-lightgreen rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-medical-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Health Monitoring</h3>
              <p className="text-gray-600">
                Track vital health metrics, visualize trends over time, and receive personalized health insights.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-medical-lightblue rounded-lg flex items-center justify-center mb-4">
                <Microscope className="h-6 w-6 text-medical-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Medical Services</h3>
              <p className="text-gray-600">
                Book lab tests, find available hospital beds, and get AI analysis of medical reports and images.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-medical-darkblue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-medical-red" />
                <span className="text-xl font-bold">HealWise</span>
              </div>
              <p className="text-gray-300 max-w-md">
                Revolutionizing healthcare with AI-powered diagnostics and personalized medical assistance.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-200">Services</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/symptom-checker" className="hover:text-white">Symptom Checker</Link></li>
                  <li><Link to="/health-tracking" className="hover:text-white">Health Tracking</Link></li>
                  <li><Link to="/lab-tests" className="hover:text-white">Lab Tests</Link></li>
                  <li><Link to="/hospital-finder" className="hover:text-white">Hospital Finder</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-200">Company</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/about-us" className="hover:text-white">About Us</Link></li>
                  <li><Link to="/research" className="hover:text-white">Research</Link></li>
                  <li><Link to="/partners" className="hover:text-white">Partners</Link></li>
                  <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-200">Support</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/help-center" className="hover:text-white">Help Center</Link></li>
                  <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
                  <li><Link to="/contact-us" className="hover:text-white">Contact Us</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p> {new Date().getFullYear()} HealWise. All rights reserved.</p>
            <p className="text-sm mt-1">
              This is a  AI healthcare technology. 
            </p>
          </div>
        </div>
      </footer>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Index;
