'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import { generateAIResponse } from '@/lib/api';

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  sender: 'user' | 'ai'; // Add this line
}

const ChatInterface: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `New Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const sendMessage = async (content: string) => {
    if (!currentChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      sender: 'user', // Add this line
    };

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      sender: 'ai', // Add this line
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage, aiMessage],
            }
          : chat,
      ),
    );

    setIsLoading(true);

    try {
      const currentChat = chats.find((chat) => chat.id === currentChatId);
      if (!currentChat) throw new Error('Chat not found');

      const messages = [
        ...currentChat.messages.map(({ role, content, sender }) => ({
          role,
          content,
          sender,
        })), // Update here
        {
          role: userMessage.role,
          content: userMessage.content,
          sender: userMessage.sender,
        }, // Update here
      ];

      await generateAIResponse(messages, (chunk) => {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === aiMessage.id
                      ? { ...msg, content: msg.content + chunk }
                      : msg,
                  ),
                }
              : chat,
          ),
        );
      });
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === aiMessage.id
                    ? {
                        ...msg,
                        content:
                          'Sorry, I encountered an error. Please try again later.',
                      }
                    : msg,
                ),
              }
            : chat,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={createNewChat}
        onSelectChat={selectChat}
      />
      {currentChat ? (
        <ChatPanel
          messages={currentChat.messages}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      ) : (
        <div className="flex-1 bg-chat-bg text-white flex items-center justify-center">
          <p>Select a chat or create a new one to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
