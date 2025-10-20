// API-клиент для общения с backend
const API_BASE = "http://localhost:3000"; // напрямую, без прокси

export async function sendQuestion(question) {
    try {
        const res = await fetch(`${API_BASE}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`API ${res.status}: ${text}`);
        }

        return await res.json();
    } catch (err) {
        return { answer: `Ошибка запроса: ${err.message}` };
    }
}
