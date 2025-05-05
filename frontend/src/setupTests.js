import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect method with testing-library matchers
expect.extend(matchers);

// Cleanup after each test case to prevent memory leaks and ensure test isolation
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock fetch globally to prevent actual network requests during tests
global.fetch = vi.fn();

// Mock window.matchMedia to prevent errors related to media queries in tests
window.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock ResizeObserver to prevent errors related to element resizing in tests
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Mock IntersectionObserver to prevent errors related to element visibility in tests
class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = IntersectionObserver;

// Add JSDOM missing features
Object.defineProperty(window, 'CSS', { value: null });

// Mock scrollTo to prevent errors related to scrolling in tests
window.scrollTo = vi.fn();

// Setup default viewport size for consistent test environment
window.innerWidth = 1024;
window.innerHeight = 768;