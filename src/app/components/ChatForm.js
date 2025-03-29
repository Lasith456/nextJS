import React, { useRef } from 'react';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";
        setChatHistory(history => [...history, { role: "user", text: userMessage }]);
        setTimeout(() => {
            setChatHistory(history => [...history, { role: "model", text: "Thinking....." }]);
            generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
        }, 600);
    };

    return (
        <form className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} className="input-message" placeholder="Type Here.." required />
            <button type="submit" className="material-symbols-rounded">➡</button>
        </form>
    );
};

export default ChatForm;
