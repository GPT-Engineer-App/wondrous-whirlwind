import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Smile, Send, Edit, Trash } from 'lucide-react';

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
            {msg.sender === 'me' && (
              <div className="ml-2 flex flex-col justify-center">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
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

export default ChatPage;