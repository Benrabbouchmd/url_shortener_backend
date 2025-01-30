# URL Shortener Backend Documentation

## Overview

The URL Shortener is a backend service that generates short URLs (tiny URLs) from long URLs, enabling easy sharing and accessibility. The service provides a RESTful API that allows users to create shortened URLs and retrieve the original URL when accessed.

## Features

- **Base62 Encoding/Decoding**: Uses Base62 encoding with a Base10 counter to ensure unique and compact short URLs.
- **Optimized Counter**: Starts at 10,000,000 to generate 7-character-long short codes, supporting a large number of URLs.
- **Redis Caching**: Speeds up retrieval of frequently accessed short URLs.
- **MongoDB Storage**: Ensures scalability and fast operations for storing URL mappings.
- **RESTful API**: Provides endpoints for URL shortening and redirection.
- **Validation**: Ensures valid input URLs before processing.

## Tech Stack

- **Programming Language**: JavaScript (Express.js)
- **Database**: MongoDB (NoSQL)
- **Caching**: Redis
- **Encoding**: Base62 with a Base10 counter
- **Containerization**: Docker Compose
- **Hosting**: Vercel

## API Endpoints

### 1. Shorten URL

**Endpoint:** `POST /shorten`

**Request:**

```json
{
  "long_url": "https://example.com/some-long-url"
}
```

**Response:**

```json
{
  "short_url": "https://yourdomain.com/abcd123"
}
```

### 2. Redirect to Original URL

**Endpoint:** `GET /{shortened_id}`

**Example:**

```
GET /abcd123
```

**Response:** (Redirects to the original URL)

```
HTTP 302 Found
Location: https://example.com/some-long-url
```

## Database Schema

**Collection: urls**

```json
{
  "_id": ObjectId,
  "short_code": "abcd123",
  "base10_id": 10000000,  // The unique base10 ID for the short URL
  "long_url": "https://example.com/some-long-url",
  "created_at": ISODate
}
```

## Caching Strategy

- When a short URL is accessed, Redis is checked first.
- If found in Redis, return the long URL.
- If not found, retrieve from MongoDB, store in Redis, and return.

## Setup Instructions

1. Clone the repository: `git clone <repo_url>`

2. Install dependencies: `npm install`

3. Set up environment variables by creating a .env file with the following content:

   ```json
   MONGO_URI=mongodb://localhost:27017

   MONGO_DB=url_shortener

   REDIS_URL=redis://localhost:6379

   PORT=3000
   ```

4. Start the service using Docker Compose: `docker-compose up --build`

5. Start the server manually (if not using Docker): `npm start`

## Testing

- **Unit Tests:** Run with `npm run test:unit` using Jest to ensure core logic like encoding/decoding and database interactions work correctly.
- **End-to-End Tests:** Run with `npm run test:e2e` using Jest to verify that API endpoints return correct responses.
- **Edge Cases:** Handle invalid URLs, expired links, and non-existent short URLs.

## Deployment

- Deploy the backend on Vercel.
- Ensure MongoDB and Redis services are configured properly.
