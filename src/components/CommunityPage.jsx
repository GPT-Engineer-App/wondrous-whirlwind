import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const fetchCommunityData = async (communityId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: communityId,
    name: `Community ${communityId}`,
    description: `This is the description for Community ${communityId}`,
    memberCount: 1000 + parseInt(communityId) * 100,
    posts: [
      {
        id: 1,
        author: 'John Doe',
        content: 'This is a sample post for the community.',
        image: 'https://source.unsplash.com/random/800x600?community',
        likes: 15,
        comments: 5,
      },
      {
        id: 2,
        author: 'Jane Smith',
        content: 'Another interesting post for our members!',
        image: 'https://source.unsplash.com/random/800x600?group',
        likes: 20,
        comments: 8,
      },
    ],
  };
};

const CommunityPage = () => {
  const { id } = useParams();
  const { data: community, isLoading, error } = useQuery({
    queryKey: ['community', id],
    queryFn: () => fetchCommunityData(id),
  });

  if (isLoading) return <div>Loading community data...</div>;
  if (error) return <div>Error loading community: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <Card className="bg-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{community.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">{community.description}</p>
          <p>Members: {community.memberCount}</p>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="What's on your mind?"
          className="w-full mb-2"
        />
        <Button>Post</Button>
      </div>

      <div className="space-y-6">
        {community.posts.map((post) => (
          <Card key={post.id} className="bg-gray-800">
            <CardHeader>
              <div className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src={`https://source.unsplash.com/random/100x100?face`} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{post.author}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post content" className="w-full h-64 object-cover rounded-md mb-4" />
              )}
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;