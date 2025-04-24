import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-medical-blue">Privacy Policy</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Protection and Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personal identification information</li>
            <li>Medical history and symptom data</li>
            <li>Device and usage information</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">How We Use Your Data</h2>
          <p>We use collected data to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide personalized medical insights</li>
            <li>Improve our AI diagnostic tools</li>
            <li>Ensure secure and confidential service</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">Data Security</h2>
          <p>We employ state-of-the-art encryption and security protocols to protect your personal information.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;