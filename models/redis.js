const redis = require('redis');
const host = process.env.REDIS_URL || 'redis://redis:6379';
const client = redis.createClient({
  url: host,
  enable_offline_queue: false
});

client.on('error', err => {
  throw err;
})

module.exports = client;