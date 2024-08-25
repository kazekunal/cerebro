'use client'
import React, { useState, useEffect } from 'react';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { formatDocumentsAsString } from "langchain/util/document";

import { YoutubeTranscript } from 'youtube-transcript';


const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chain, setChain] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);



  useEffect(() => {
    // Initialize the chatbot chain when the component mounts
    initializeChain();
  }, []);

  const initializeChain = async () => {
    const inputString = `transcriptText`; // You can add any initial context here
    const newChain = await processInputString(inputString);
    setChain(newChain);
  };

  const processInputString = async (inputString) => {
    const doc = { pageContent: inputString, metadata: {} };

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 8000,
      chunkOverlap: 200,
    });
    
    const splits = await textSplitter.splitDocuments([doc]);

    const retriever = (query) => Promise.resolve(splits);

    const qaSystemPrompt = `You are an assistant for question-answering tasks.
    Use the following pieces of retrieved context to answer the question.
    If you don't know the answer, just say that you don't know.
    keep the answer concise but always complete your sentences.
    {context}`;

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", qaSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{question}"],
    ]);

    const llm = new ChatGroq({
      apiKey: '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',
      model: "llama3-8b-8192",
      temperature: 0
    });

    const contextualizedQuestion = (input) => {
      if ("chat_history" in input) {
        return input.question;
      }
      return input.question;
    };

    const ragChain = RunnableSequence.from([
      RunnablePassthrough.assign({
        context: async (input) => {
          const question = await contextualizedQuestion(input);
          const docs = await retriever(question);
          return formatDocumentsAsString(docs);
        },
      }),
      qaPrompt,
      llm,
      new StringOutputParser(),
    ]);

    return ragChain;
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '' && chain) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');

      try {
        const response = await chain.invoke({ question: inputMessage, chat_history: chatHistory });
        setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
        setChatHistory(prevHistory => [...prevHistory, ["human", inputMessage], ["ai", response]]);
      } catch (error) {
        console.error("Error getting bot response:", error);
        setMessages(prevMessages => [...prevMessages, { text: "Sorry, I encountered an error. Please try again.", sender: 'bot' }]);
      }
    }
  };

  return (
    <div className="chatbot-container bg-white rounded-lg shadow-lg p-4">
  {!isOpen && (
    <button
      className="chatbot-toggle bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={toggleChatbot}
    >
      doubtai
    </button>
  )}
  {isOpen && (
    <div className="chatbot-window max-w-md mx-auto">
      <div className="chatbot-header flex justify-between items-center mb-4">
        <span className="text-lg font-bold">Chatbot</span>
        <button
          className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
          onClick={toggleChatbot}
        >
          ×
        </button>
      </div>
      <div className="chatbot-messages space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message flex justify-start items-center ${
              message.sender === 'user' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <div className="message-content bg-gray-100 p-2 rounded-lg">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chatbot-input flex justify-between items-center mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="w-full p-2 pl-10 text-sm text-gray-700"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  )}
</div>
  );
};

export default ChatbotUI;