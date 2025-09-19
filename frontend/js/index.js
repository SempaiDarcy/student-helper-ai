const textarea = document.getElementById('question');
const sendBtn  = document.getElementById('send');
const loader   = document.getElementById('loader');

function autoGrow(el){
    const max = Math.round(window.innerHeight * 0.5); // 50vh
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, max) + 'px';
}
textarea.addEventListener('input', () => autoGrow(textarea));
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

    loader.classList.remove('hidden');
    sendBtn.disabled = true;

    setTimeout(() => {
        loader.classList.add('hidden');
        sendBtn.disabled = false;
    }, 900);
});
