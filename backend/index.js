import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const MODE = process.env.LLM_BACKEND || 'OLLAMA';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.1';

// 🔹 MOCK-ответ (на случай если Ollama не запущен)
function mockTutor(question) {
    return {
        mode: 'MOCK',
        answer: `Примерный ответ на вопрос: "${question}".`
    };
}

// 🔹 Запрос в Ollama — универсальный ассистент
async function ollamaTutor(question) {
    const prompt = `Ты умный и универсальный помощник для студента. Отвечай по сути и понятно. Вопрос: ${question}`;

    const r = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL,
            prompt,
            stream: false
        })
    });

    const data = await r.json();
    return { mode: 'OLLAMA', answer: data.response };
}

// 🔹 API endpoint
app.post('/api/chat', async (req, res) => {
    const { question } = req.body;
    try {
        if (!question?.trim()) {
            return res.status(400).json({ error: 'Вопрос пустой' });
        }

        if (MODE === 'MOCK') {
            return res.json(mockTutor(question));
        } else if (MODE === 'OLLAMA') {
            const ans = await ollamaTutor(question);
            return res.json(ans);
        } else {
            return res.json({ mode: 'UNKNOWN', answer: 'Неверный режим' });
        }
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server started: http://localhost:${PORT} • Mode=${MODE}`)
);
