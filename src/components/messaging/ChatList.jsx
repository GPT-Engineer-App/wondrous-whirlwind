import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from 'lucide-react';

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

export default ChatList;