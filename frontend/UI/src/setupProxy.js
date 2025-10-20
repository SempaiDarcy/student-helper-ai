// src/setupProxy.js
// нужен для того, чтобы все запросы /api/* шли к твоему Express-бэкенду (порт 3000)

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3000", // твой backend Express + Ollama
            changeOrigin: true,
        })
    );
};
