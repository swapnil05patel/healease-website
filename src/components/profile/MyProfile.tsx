import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { User } from 'lucide-react';

interface MyProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyProfile: React.FC<MyProfileProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="mr-2 h-6 w-6" />
            My Profile
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {user.user_metadata?.full_name || user.email || 'User'}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <Button onClick={onClose} variant="outline">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyProfile;