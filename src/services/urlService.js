const database = require("../config/database");
const redis = require("../config/redis");
const { encodeBase62, getRange } = require("../utils");

class UrlService {
  async generateBase10Id() {
    const count = await database.db.collection("urls").countDocuments();
    const base10Id = getRange().MIN_VALUE + count;

    if (base10Id > getRange().MAX_VALUE) {
      throw new Error("URL limit reached");
    }

    return base10Id;
  }

  async createShortUrl(longUrl) {
    console.log(">> longUrl", longUrl);
    try {
      const existing = await database.db
        .collection("urls")
        .findOne({ long_url: longUrl });

      if (existing) {
        console.log(">> existing", existing);
        return existing.short_url;
      }

      const base10Id = await this.generateBase10Id();
      const shortId = encodeBase62(base10Id);

      await database.db.collection("urls").insertOne({
        long_url: longUrl,
        short_url: shortId,
        base10_id: base10Id,
        created_at: new Date(),
      });

      await redis.client.set(shortId, longUrl, { EX: 3600 });
      return shortId;   
    } catch (error) {
      console.log(">> error", error);
      throw new Error(error.message);
    }
  }

  async getLongUrl(shortId) {
    let longUrl = await redis.client.get(shortId);

    if (!longUrl) {
      const url = await database.db
        .collection("urls")
        .findOne({ short_url: shortId });

      if (!url) {
        return null;
      }
      else {
        longUrl = url.long_url;
      }
      
      await redis.client.set(shortId, longUrl, { EX: 3600 });
    }

    return longUrl;
  }
}

module.exports = new UrlService();
