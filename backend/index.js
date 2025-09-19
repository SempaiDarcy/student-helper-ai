import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const MODE = process.env.LLM_BACKEND || 'MOCK';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.1';

// 🔹 MOCK-ответ (если не используем Ollama)
function mockTutor(question, language) {
    return {
        mode: 'MOCK',
        answer: `Вопрос: ${question}\nЯзык: ${language}\n\nПример: console.log("Hello, world!");`
    };
}

// 🔹 Запрос в Ollama
async function ollamaTutor(question, language) {
    const prompt = `Ты преподаватель по ${language}. Объясни студенту: ${question}`;
    const r = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL,
            prompt: prompt,
            stream: false
        })
    });
    const data = await r.json();
    return { mode: 'OLLAMA', answer: data.response };
}

// 🔹 API endpoint
app.post('/api/chat', async (req, res) => {
    const { question, language } = req.body;
    try {
        if (MODE === 'MOCK') {
            return res.json(mockTutor(question, language));
        } else if (MODE === 'OLLAMA') {
            const ans = await ollamaTutor(question, language);
            return res.json(ans);
        } else {
            return res.json({ mode: 'UNKNOWN', answer: 'Неверный режим' });
        }
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server started: http://localhost:${PORT} • Mode=${MODE}`));
