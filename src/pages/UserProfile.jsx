import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProfileHeader from '../components/ProfileHeader';
import ProfileForm from '../components/ProfileForm';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import ScheduleEditor from '../components/ScheduleEditor';
import { toast } from 'sonner';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { updateUserProfile, fetchUserProfile } from '../utils/supabase';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('view');
  const queryClient = useQueryClient();
  const { session } = useSupabaseAuth();
  const userId = session?.user?.id;

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (formData) => updateUserProfile(userId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', userId]);
      setActiveTab('view');
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    },
  });

  const handleSave = async (formData) => {
    updateProfileMutation.mutate(formData);
  };

  const handleScheduleSave = (newSchedule) => {
    updateProfileMutation.mutate({ schedule: newSchedule });
  };

  const handleProfilePictureUpload = async () => {
    // Generate a new random profile picture URL
    const newProfilePicture = `https://source.unsplash.com/random/100x100?face&${Date.now()}`;
    updateProfileMutation.mutate({ profilePicture: newProfilePicture });
    toast.success('Profile picture updated successfully');
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
        onEdit={() => setActiveTab('edit')}
      />
      <ProfilePictureUpload onUpload={handleProfilePictureUpload} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Occupation:</strong> {user.occupation}</p>
              <div>
                <strong>Interests:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">{interest}</Badge>
                  ))}
                </div>
              </div>
              <p><strong>Bio:</strong> {user.bio}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 mt-6">
            <CardContent className="p-0">
              <ScheduleEditor initialSchedule={user.schedule} onSave={handleScheduleSave} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="edit">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm onSave={handleSave} onCancel={() => setActiveTab('view')} initialData={user} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;