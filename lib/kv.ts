// Simple in-memory KV store for development
// In production, this should be replaced with a real KV store like Upstash Redis

let store: Record<string, number | string> = {}

export const kv = {
  async get<T>(key: string): Promise<T | null> {
    return (store[key] as T) ?? null
  },

  async set(key: string, value: number | string): Promise<void> {
    store[key] = value
  },

  async incr(key: string): Promise<number> {
    const current = (store[key] as number) || 0
    store[key] = current + 1
    return store[key] as number
  },
}
