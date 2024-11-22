import React from 'react';
import NewChatButton from './NewChatButton';
import { ChatBubbleIcon, GearIcon } from '@radix-ui/react-icons';

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
}) => {
  return (
    <aside className="w-64 bg-sidebar-bg text-white p-4 flex flex-col h-screen">
      <NewChatButton onClick={onNewChat} />
      <div className="flex-grow overflow-y-auto mt-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-2 hover:bg-sidebar-hover cursor-pointer rounded transition-colors duration-200 ${
              chat.id === currentChatId ? 'bg-sidebar-hover' : ''
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <ChatBubbleIcon className="mr-2" />
            <div>
              <div className="font-medium">{chat.title}</div>
              <div className="text-xs text-gray-400">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <GearIcon className="mr-2" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
