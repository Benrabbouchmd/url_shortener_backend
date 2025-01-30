const { createClient } = require('redis');

class Redis {
    constructor() {
        this.client = createClient({
            socket: {
              host: process.env.REDIS_HOST || 'localhost', // Use 'redis' if using Docker Compose
              port: process.env.REDIS_PORT || 6379,
            },
            legacyMode: true, // Required for older Redis commands
          });
    }

    async connect() {
        await this.client.connect();
        return this.client;
    }

    async disconnect() {
        await this.client.quit();
    }
}

module.exports = new Redis();