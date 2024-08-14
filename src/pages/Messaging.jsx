import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatList from '../components/messaging/ChatList';
import ChatPage from '../components/messaging/ChatPage';

const Messaging = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Messaging</h1>
      <Tabs defaultValue="chats" className="w-full">
        <TabsList>
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="active-chat">Active Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="chats">
          <ChatList />
        </TabsContent>
        <TabsContent value="active-chat">
          <ChatPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messaging;