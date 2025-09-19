const textarea = document.getElementById('question');
const sendBtn  = document.getElementById('send');

function autoGrow(el) {
    const max = Math.round(window.innerHeight * 0.4); // 40vh
    el.style.height = "auto";

    // ограничиваем рост
    const newHeight = Math.min(el.scrollHeight, max);
    el.style.height = newHeight + "px";

    // если достигли лимита — включаем скролл
    if (el.scrollHeight > max) {
        el.style.overflowY = "auto";
    } else {
        el.style.overflowY = "hidden";
    }
}

textarea.addEventListener("input", () => autoGrow(textarea));
window.addEventListener('load', () => autoGrow(textarea));

// Enter = отправка, Shift+Enter = новая строка
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey){
        e.preventDefault();
        sendBtn.click();
    }
});

sendBtn.addEventListener('click', () => {
    const q = textarea.value.trim();
    if (!q) return;

    sendBtn.disabled = true;

    setTimeout(() => {
        sendBtn.disabled = false;
        textarea.value = "";
        autoGrow(textarea);
    }, 900);
});
