import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Paperclip, Smile, Send } from 'lucide-react';

const ChatList = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  const chats = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', timestamp: '2h ago', unread: 2, label: 'work' },
    { id: 2, name: 'Jane Smith', lastMessage: 'See you tomorrow!', timestamp: '1d ago', unread: 0, label: 'social' },
    { id: 3, name: 'Study Group', lastMessage: 'Meeting at 3 PM', timestamp: '3h ago', unread: 5, label: 'study' },
  ];

  const sortedChats = [...chats].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'unread') return b.unread - a.unread;
    return 0;
  });

  const filteredChats = sortedChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full">
        <Plus className="mr-2 h-4 w-4" /> New Message
      </Button>
      <div className="space-y-2">
        {filteredChats.map(chat => (
          <div key={chat.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <div>
              <h3 className="font-semibold">{chat.name}</h3>
              <p className="text-sm text-gray-400">{chat.lastMessage}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{chat.timestamp}</p>
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {chat.unread}
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full ${
                chat.label === 'work' ? 'bg-red-500' :
                chat.label === 'study' ? 'bg-green-500' :
                'bg-yellow-500'
              }`}>
                {chat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there!', sender: 'other', timestamp: '10:00 AM', read: true },
    { id: 2, text: 'Hi! How are you?', sender: 'me', timestamp: '10:05 AM', read: true },
    { id: 3, text: 'I'm doing great, thanks for asking!', sender: 'other', timestamp: '10:10 AM', read: false },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      }]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="flex-grow overflow-y-auto space-y-4 p-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${
              msg.sender === 'me' ? 'bg-blue-600' : 'bg-gray-700'
            }`}>
              <p>{msg.text}</p>
              <div className="text-xs text-gray-400 mt-1 flex justify-between items-center">
                <span>{msg.timestamp}</span>
                {msg.sender === 'me' && (
                  <span>{msg.read ? 'Read' : 'Sent'}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-800">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow"
          />
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

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