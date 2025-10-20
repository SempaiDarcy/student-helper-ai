import React, { useState, useRef, useEffect } from "react";
import "../styles/chat.css";

export default function ChatInput({ onSend }) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    // авто-ресайз textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
        }
    }, [message]);

    const handleSend = () => {
        const text = message.trim();
        if (!text) return;
        onSend(text);
        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-input">
            <textarea
                ref={textareaRef}
                placeholder="Введите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
            />
            <button onClick={handleSend}>Отправить</button>
        </div>
    );
}
