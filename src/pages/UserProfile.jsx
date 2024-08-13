import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileForm from '../components/ProfileForm';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import { toast } from 'sonner';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    profilePicture: 'https://source.unsplash.com/random/100x100?face',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleProfilePictureUpload = () => {
    // Implement profile picture upload logic here
    toast.info('Profile picture upload functionality to be implemented');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 max-w-3xl mx-auto">
      <ProfileHeader
        name={user.name}
        profilePicture={user.profilePicture}
        onEdit={handleEdit}
      />
      <ProfilePictureUpload onUpload={handleProfilePictureUpload} />
      {isEditing ? (
        <ProfileForm onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-lg mb-4">Click the edit button to update your profile.</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;