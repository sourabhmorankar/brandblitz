'use client';

import { useState } from 'react';

interface InputBoxProps {
  onSend: (text: string) => void;
}

const InputBox = ({ onSend }: InputBoxProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 bg-gray-700 rounded text-white"
          placeholder="Type your message..."
        />
        <button type="submit" className="p-2 bg-blue-600 rounded hover:bg-blue-700">
          Send
        </button>
      </div>
    </form>
  );
};

export default InputBox;