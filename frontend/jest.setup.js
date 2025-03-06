import '@testing-library/jest-dom';

// モックの準備
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
    toString: jest.fn(),
  })),
}));

// Markdownレンダリングのモック
jest.mock('react-markdown', () => {
  return ({ children }) => {
    // 簡易的なマークダウンの処理（太字のみ）
    const processedText = String(children)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return (
      <div dangerouslySetInnerHTML={{ __html: processedText }} />
    );
  };
});

jest.mock('remark-gfm', () => {
  return () => ({});
});

// グローバルな処理
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// IntersectionObserverのモック
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
