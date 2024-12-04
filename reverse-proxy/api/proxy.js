const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://quotes.rezex.my.id'); // Replace with your frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Forward API requests to the backend
app.use('/api', createProxyMiddleware({
    target: 'http://fi9.bot-hosting.net:21266', // Backend URL
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api', // Ensure the path remains unchanged
    },
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('X-Forwarded-Proto', 'https');
    }
}));

// Proxy static files for frontend (if needed)
// Add this block if you plan to serve the frontend through this proxy
/*
app.use('/', createProxyMiddleware({
    target: 'https://quotes.rezex.my.id', // Frontend URL
    changeOrigin: true,
}));
*/

// Start the reverse proxy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Reverse proxy running on port ${PORT}`);
});