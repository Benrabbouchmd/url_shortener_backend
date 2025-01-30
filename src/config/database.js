const { MongoClient } = require('mongodb');

class Database {
    constructor() {
        this.client = null;
        this.db = null;
    }

    async connect() {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
        this.client = await MongoClient.connect(uri);
        this.db = this.client.db(process.env.MONGO_DB || 'url_shortener');
        return this.db;
    }

    async disconnect() {
        if (this.client) {
            await this.client.close();
        }
    }
}

module.exports = new Database();