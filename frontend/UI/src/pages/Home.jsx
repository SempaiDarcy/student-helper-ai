import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    const startChat = () => {
        const q = question.trim();
        if (!q) return;
        navigate("/chat", { state: { initialQuestion: q } });
    };

    return (
        <div className="home">
            <h1>Какие есть вопросы, студент?</h1>

            <div className="home-box">
                <input
                    placeholder="Напиши вопрос…"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && startChat()}
                />
                <button onClick={startChat}>Отправить</button>
            </div>
        </div>
    );
}
