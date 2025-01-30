require('dotenv').config();
const app = require('./app');
const database = require('./config/database');
const redis = require('./config/redis');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Connect to databases
        await database.connect();
        await redis.connect();
        
        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await database.disconnect();
    await redis.disconnect();
    process.exit(0);
});

startServer();