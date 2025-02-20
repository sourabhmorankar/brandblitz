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
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 border-t border-gray-800 sticky bottom-0">
      <div className="flex space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input flex-1"
          placeholder="Type your message..."
          aria-label="Chat message input"
        />
        <button type="submit" className="btn-primary">
          Send
        </button>
      </div>
    </form>
  );
};

export default InputBox;