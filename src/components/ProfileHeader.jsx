import React from 'react';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react';

const ProfileHeader = ({ name, profilePicture, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-6">
      <div className="flex items-center">
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <h1 className="text-2xl font-bold text-white">{name}</h1>
      </div>
      <Button onClick={onEdit} variant="ghost" size="icon">
        <Pencil className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ProfileHeader;