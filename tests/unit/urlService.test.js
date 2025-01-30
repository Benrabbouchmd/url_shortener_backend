const urlService = require('../../src/services/urlService');
const database = require('../../src/config/database');
const redis = require('../../src/config/redis');

jest.mock('../../src/config/database');
jest.mock('../../src/config/redis');

describe('UrlService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create short url', async () => {
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue(null),
      countDocuments: jest.fn().mockResolvedValue(0),
      insertOne: jest.fn().mockResolvedValue({ insertedId: '123' })
    };

    database.db = {
      collection: jest.fn().mockReturnValue(mockCollection)
    };

    redis.client = {
      set: jest.fn().mockResolvedValue('OK')
    };

    const shortUrl = await urlService.createShortUrl('https://example.com');
    expect(shortUrl).toHaveLength(7);
    expect(mockCollection.insertOne).toHaveBeenCalled();
  });
});