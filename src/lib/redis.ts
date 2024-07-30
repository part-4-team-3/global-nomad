import Redis from 'ioredis';

let redis: Redis;

if (process.env.NODE_ENV === 'development') {
  redis = new Redis(6379, '127.0.0.1');
} else {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 10728,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    sentinelMaxConnections: 10000,
  });
}

export default redis;
