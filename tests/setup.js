const database = require('../src/config/database');
const redis = require('../src/config/redis');

beforeAll(async () => {
  try {
    await database.connect();
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }

  try {
    await redis.connect();
    console.log('Redis connected');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
});

afterAll(async () => {
  try {
    await database.disconnect();
    console.log('Database disconnected');
  } catch (error) {
    console.error('Error disconnecting from database:', error);
  }

  try {
    await redis.disconnect();
    console.log('Redis disconnected');
  } catch (error) {
    console.error('Error disconnecting from Redis:', error);
  }
});
