import React from 'react';
import { Button } from './ui/button';
import { Camera } from 'lucide-react';

const ProfilePictureUpload = ({ onUpload }) => {
  return (
    <div className="mb-6">
      <Button onClick={onUpload} variant="outline" className="w-full">
        <Camera className="mr-2 h-4 w-4" /> Change Profile Picture
      </Button>
    </div>
  );
};

export default ProfilePictureUpload;