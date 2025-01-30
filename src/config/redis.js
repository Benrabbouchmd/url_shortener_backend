const { createClient } = require('redis');

class Redis {
    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
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