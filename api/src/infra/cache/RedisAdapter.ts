import { CacheClient } from '../../presentation/protocols/cache/CacheClients';
import Redis, { Redis as RedisClient } from 'ioredis';

export class RedisAdapter implements CacheClient {
  private client: RedisClient;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    });
  }

  async set(key: string, value: any, ttlInSeconds: number): Promise<void> {
    const stringfiedValue = JSON.stringify(value);

    if (ttlInSeconds) {
      await this.client.set(key, stringfiedValue, 'EX', ttlInSeconds);
    } else {
      await this.client.set(key, stringfiedValue);
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }
}
