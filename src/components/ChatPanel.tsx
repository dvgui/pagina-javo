'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SendIcon } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-chat-bg text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3/4 p-3 rounded-lg bg-gray-700">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Type your message here..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors duration-200"
            disabled={isLoading}
          >
            <SendIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
