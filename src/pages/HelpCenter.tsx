import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, HelpCircle } from 'lucide-react';

const HelpCenter: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-medical-blue">Help Center</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2" /> Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• How do I use the symptom checker?</li>
              <li>• What medical conditions can be diagnosed?</li>
              <li>• Is my data secure?</li>
              <li>• How accurate are the diagnoses?</li>
            </ul>
            <Button variant="outline" className="mt-4 w-full">View Full FAQ</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2" /> Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Our support team is available:</p>
            <div className="space-y-2">
              <p>📞 Phone: +1 (555) 123-4567</p>
              <p>⏰ Hours: 9 AM - 5 PM EST</p>
              <Button className="mt-4 w-full bg-medical-blue">Call Support</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2" /> Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Email us for detailed inquiries:</p>
            <div className="space-y-2">
              <p>✉️ support@healwise.ai</p>
              <p>📝 Response within 24 hours</p>
              <Button variant="secondary" className="mt-4 w-full">Send Email</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;