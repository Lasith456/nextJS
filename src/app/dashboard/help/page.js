"use client";

import Sidebar from "../../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import "../Chatbot.css";
import ChatbotIcon from "../../components/ChatbotIcon";
import ChatForm from "../../components/ChatForm";
import ChatMessage from "../../components/ChatMessage";
import { companyInfo } from "../companyInfo";


  function HelpPage() {
    const [chatHistory, setChatHistory] = useState([{ hideInChat: true, role: "model", text: companyInfo }]);
    const chatBodyRef = useRef();
  
    const generateBotResponse = async (history) => {
      const updateHistory = (text, isError = false) => {
        setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking....."), { role: "model", text, isError }]);
      };
      history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history }),
      };
      try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=AIzaSyCEG3rd5x3ldXztn73Mcq_G9gLKKU_M3Rg', requestOptions); // Use Next.js environment variables
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        updateHistory(apiResponseText);
      } catch (error) {
        updateHistory(error.message, true);
      }
    };
  
    useEffect(() => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
      }
    }, [chatHistory]);
  
    return (
      <Sidebar>
        <div className="container">
          <div className="chatbot-popup">
            <div className="chat-header">
              <div className="header-info">
                <ChatbotIcon />
                <h2 className="logo-text">Touralyze Bot</h2>
              </div>
              {/* <button className="material-symbols-rounded">keyboard_arrow_down</button> */}
            </div>
            <div ref={chatBodyRef} className="chat-body">
                  <div className="message bot-message">
                    <ChatbotIcon/>
                        <p className="message-text">
                        👋 Hey there!<br/> How can I assist you today? 😊💡
                        </p>
                    </div>
              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>
            <div className="chat-footer">
              <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
            </div>
          </div>
        </div>
      </Sidebar>
    );
  }
  
  export default HelpPage;

