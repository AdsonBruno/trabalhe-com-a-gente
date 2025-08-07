export interface CacheClient {
  set(key: string, value: any, ttlInSeconds?: number): Promise<void>;

  get<T = any>(key: string): Promise<T | null>;
}
