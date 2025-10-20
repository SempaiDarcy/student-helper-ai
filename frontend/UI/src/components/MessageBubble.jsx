export default function MessageBubble({ sender, text, thinking }) {
    const isUser = sender === "user";

    return (
        <div className={`bubble ${isUser ? "user" : "ai"}`}>
            {thinking ? (
                <div className="thinking">
                    <img
                        src="https://huggingface.co/front/assets/huggingface_logo.svg"
                        alt="thinking"
                        className="thinking-icon"
                    />
                    <span>Думает...</span>
                </div>
            ) : (
                String(text)
                    .split("\n")
                    .map((line, i) => <p key={i}>{line}</p>)
            )}
        </div>
    );
}
