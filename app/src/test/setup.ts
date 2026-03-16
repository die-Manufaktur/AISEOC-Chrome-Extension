import "@testing-library/jest-dom/vitest";

// Mock chrome.storage API for tests
const storage: Record<string, unknown> = {};

const chromeStorageMock = {
  local: {
    get: vi.fn((keys: string | string[]) => {
      if (typeof keys === "string") {
        return Promise.resolve({ [keys]: storage[keys] ?? undefined });
      }
      const result: Record<string, unknown> = {};
      for (const key of keys) {
        result[key] = storage[key] ?? undefined;
      }
      return Promise.resolve(result);
    }),
    set: vi.fn((items: Record<string, unknown>) => {
      Object.assign(storage, items);
      return Promise.resolve();
    }),
    remove: vi.fn((keys: string | string[]) => {
      const toRemove = typeof keys === "string" ? [keys] : keys;
      for (const key of toRemove) {
        delete storage[key];
      }
      return Promise.resolve();
    }),
  },
};

Object.defineProperty(globalThis, "chrome", {
  value: {
    storage: chromeStorageMock,
    runtime: {
      sendMessage: vi.fn(),
      onMessage: { addListener: vi.fn() },
    },
  },
  writable: true,
});

// Reset storage between tests
beforeEach(() => {
  Object.keys(storage).forEach((key) => delete storage[key]);
  vi.clearAllMocks();
});
