// ============================================================================
// INDEXEDDB KV - tiny promise wrapper (Fix Pack 10, C3).
// Heavy data (characters, history, favorites, passport versions, vision cache)
// lives here instead of localStorage: no ~5MB quota, no JSON string bloat.
// One database "influencer_os", one object store "kv", plain string keys.
// ============================================================================

const DB_NAME = "influencer_os";
const DB_VERSION = 1;
const STORE = "kv";

export function idbAvailable(): boolean {
  return typeof indexedDB !== "undefined";
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE)) {
          req.result.createObjectStore(STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        dbPromise = null;
        reject(req.error);
      };
    });
  }
  return dbPromise;
}

/** Returns null on any failure - callers treat null as "not stored". */
export async function idbGet<T>(key: string): Promise<T | null> {
  if (!idbAvailable()) return null;
  try {
    const db = await openDb();
    return await new Promise<T | null>((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve((req.result as T | undefined) ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/** Returns false on any failure (mirrors the localStorage quota guard). */
export async function idbSet(key: string, value: unknown): Promise<boolean> {
  if (!idbAvailable()) return false;
  try {
    const db = await openDb();
    return await new Promise<boolean>((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(value, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
    });
  } catch {
    return false;
  }
}

export async function idbDel(key: string): Promise<void> {
  if (!idbAvailable()) return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    });
  } catch {
    // best effort
  }
}
