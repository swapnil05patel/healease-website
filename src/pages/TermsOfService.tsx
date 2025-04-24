import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-medical-blue">Terms of Service</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>User Agreement</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>By using HealWise, you agree to the following terms:</p>
          
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>Use our service for informational purposes only</li>
            <li>Provide accurate and truthful information</li>
            <li>Understand that AI diagnoses are not a substitute for professional medical advice</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Maintain account confidentiality</li>
            <li>Use service in compliance with local laws</li>
            <li>Report any suspicious activities</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">Limitation of Liability</h2>
          <p>HealWise is not responsible for medical decisions made based on AI recommendations. Always consult a healthcare professional.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;