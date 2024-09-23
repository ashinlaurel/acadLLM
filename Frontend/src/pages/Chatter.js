import { Button, Input } from '@windmill/react-ui';
import React, { useState } from 'react';

const Chatter = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! How can I assist you today?' },
    { id: 2, role: 'user', content: 'Can you explain how to use the Windmill library?' },
    { id: 3, role: 'assistant', content: 'Sure! Windmill React is a component library built on top of Tailwind CSS.' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const newMessage = { id: messages.length + 1, role: 'user', content: userInput };
    setMessages([...messages, newMessage]);

    // Clear input field
    setUserInput('');

    // Set loading state
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: userInput },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const assistantReply = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 2, role: assistantReply.role, content: assistantReply.content },
      ]);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col h-screen">
      {/* Chat window */}
      <div className="flex-grow bg-gray-100 p-4 overflow-y-auto rounded-lg shadow-md">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input field */}
      <div className="mt-4 flex items-center">
        <Input
          className="flex-grow mr-4"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <Button layout="primary" onClick={handleSendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};

export default Chatter;
