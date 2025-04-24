import React, { useState } from 'react';
import { Bell, Heart, LogOut, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";
// import { MyProfile } from '@/components/profile/MyProfile';
import MyProfile from "@/components/profile/MyProfile";
const Header = () => {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-medical-red" /><h1 className="text-medical-darkblue font-bold">Healwise</h1>
          <nav className="flex space-x-4 ml-6">
            {/* <a href="src\components\symptom-checker\SymptomChecker.tsx" className="text-medical-darkblue hover:text-medical-blue font-medium">Symptom Checker</a>
            <a href="src\components\pathology\LabTestBooking.tsx" className="text-medical-darkblue hover:text-medical-blue font-medium">Lab Tests</a>
            <a href="src\components\hospitals\Hospitals.tsx" className="text-medical-darkblue hover:text-medical-blue font-medium">Hospitals</a> */}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5 text-gray-500" />
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={() => setIsProfileOpen(true)}
          >
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">My Profile</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>My Profile</DialogTitle>
            </DialogHeader>
            <MyProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;