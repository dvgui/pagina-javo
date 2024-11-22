'use client';

import React from 'react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';

const ChatInterface: React.FC = () => {
    return (
        <>
            <Sidebar />
            <ChatPanel />
        </>
    );
};

export default ChatInterface;
