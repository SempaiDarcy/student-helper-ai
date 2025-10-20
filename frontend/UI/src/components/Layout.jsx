export default function Layout({ children }) {
    return (
        <div className="layout">
            <header className="header">
                <div className="header-title">Помощник студента</div>
            </header>
            <main className="main">{children}</main>
        </div>
    );
}
