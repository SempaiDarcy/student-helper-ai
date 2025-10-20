import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import "../styles/chat.css";

export default function Chat() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        if (state?.initialQuestion) {
            sendMessage(state.initialQuestion);
        }
    }, [state]);

    const sendMessage = async (text) => {
        const userMsg = { sender: "user", text };
        // 🔹 добавляем временный "думает"
        setMessages((prev) => [
            ...prev,
            userMsg,
            { sender: "ai", text: "", thinking: true },
        ]);

        try {
            const r = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: text }),
            });
            const data = await r.json();

            setMessages((prev) => [
                ...prev.slice(0, -1),
                { sender: "ai", text: data.answer, thinking: false },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    sender: "ai",
                    text: "Ошибка соединения с сервером.",
                    thinking: false,
                },
            ]);
        }
    };

    return (
        <div className="chat-page">
            <button className="back-btn" onClick={() => navigate("/")}>
                ←
            </button>

            <div className="chat-container">
                <div className="chat-history" ref={chatRef}>
                    {messages.map((m, i) => (
                        <MessageBubble
                            key={i}
                            sender={m.sender}
                            text={m.text}
                            thinking={m.thinking}
                        />
                    ))}
                </div>
                <ChatInput onSend={sendMessage} />
            </div>
        </div>
    );
}
