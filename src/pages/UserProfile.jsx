import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProfileHeader from '../components/ProfileHeader';
import ProfileForm from '../components/ProfileForm';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import { toast } from 'sonner';
import { Skeleton } from '../components/ui/skeleton';

const fetchUserProfile = async () => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    occupation: 'developer',
    interests: 'React, JavaScript, UI/UX',
    bio: 'Passionate developer always learning new technologies.',
    profilePicture: 'https://source.unsplash.com/random/100x100?face',
  };
};

const updateUserProfile = async (userData) => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return userData;
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (formData) => {
    updateProfileMutation.mutate(formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleProfilePictureUpload = async () => {
    try {
      // Simulating profile picture upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile picture updated successfully');
    } catch (error) {
      toast.error('Failed to upload profile picture. Please try again.');
      console.error('Error uploading profile picture:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 max-w-3xl mx-auto">
        <Skeleton className="h-24 w-24 rounded-full mb-4" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 max-w-3xl mx-auto">
        <p className="text-red-500">Error loading profile: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 max-w-3xl mx-auto">
      <ProfileHeader
        name={user.name}
        profilePicture={user.profilePicture}
        onEdit={handleEdit}
      />
      <ProfilePictureUpload onUpload={handleProfilePictureUpload} />
      {isEditing ? (
        <ProfileForm onSave={handleSave} onCancel={handleCancel} initialData={user} />
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-lg mb-4">Email: {user.email}</p>
          <p className="text-lg mb-4">Occupation: {user.occupation}</p>
          <p className="text-lg mb-4">Interests: {user.interests}</p>
          <p className="text-lg mb-4">Bio: {user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;