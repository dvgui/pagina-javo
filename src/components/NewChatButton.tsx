import React from 'react';
import { PlusIcon } from '@radix-ui/react-icons';

interface NewChatButtonProps {
    onClick: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-button-bg hover:bg-button-hover text-white font-semibold py-2 px-4 rounded flex items-center justify-center transition-colors duration-200"
        >
            <PlusIcon className="mr-2" />
            New Chat
        </button>
    );
};

export default NewChatButton;
