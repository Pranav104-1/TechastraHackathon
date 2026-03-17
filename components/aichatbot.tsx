'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, sender: 'ai' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'Error communicating with AI', sender: 'ai' }]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="flex-1 overflow-y-auto mb-4 bg-white rounded-lg p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <h2 className="text-2xl font-bold mb-2">Career Hero AI 🦸‍♂️</h2>
            <p>Start a conversation to get career guidance!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        {loading && <div className="text-center text-gray-500">AI is thinking...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything about your career..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}