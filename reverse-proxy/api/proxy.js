const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // Dynamic frontend URL from environment
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Forward API requests to the backend
app.use('/api', createProxyMiddleware({
    target: process.env.BACKEND_URL, // Use the backend URL from environment variables
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api', // Ensure the path remains unchanged
    },
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('X-Forwarded-Proto', 'https');
    }
}));

// Proxy static files for frontend (if needed)
/*
app.use('/', createProxyMiddleware({
    target: process.env.FRONTEND_URL, // Use the frontend URL from environment variables
    changeOrigin: true,
}));
*/

// Start the reverse proxy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Reverse proxy running on port ${PORT}`);
});
