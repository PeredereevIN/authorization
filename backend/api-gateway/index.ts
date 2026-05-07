import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 8000; // Порт для API-шлюза

// Прокси для auth-service
app.use('/api/v1/auth', createProxyMiddleware({ target: 'http://localhost:8001' }));

// Прокси для mfa-service
app.use('/api/v1/mfa', createProxyMiddleware({ target: 'http://localhost:8002' }));

// Прокси для session-service
app.use('/api/v1/session', createProxyMiddleware({ target: 'http://localhost:8003' }));

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
