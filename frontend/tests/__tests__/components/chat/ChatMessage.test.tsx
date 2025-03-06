import { render, screen, fireEvent } from '@testing-library/react';
import { ChatMessage } from '@/components/chat/chat-message';

// モックデータ
const userMessage = {
  id: '1',
  role: 'user',
  content: 'これはユーザーメッセージです',
  timestamp: new Date('2023-01-01T12:00:00Z'),
};

const assistantMessage = {
  id: '2',
  role: 'assistant',
  content: 'これはアシスタントの**回答**です',
  sources: [
    {
      title: 'ソース文書',
      url: '#',
      content: 'これはソース文書の内容です',
    },
  ],
  timestamp: new Date('2023-01-01T12:01:00Z'),
};

describe('ChatMessage component', () => {
  it('renders user message correctly', () => {
    render(<ChatMessage message={userMessage} />);
    
    // メッセージの内容が表示されるか
    expect(screen.getByText('これはユーザーメッセージです')).toBeInTheDocument();
    
    // ユーザーとして表示されるか
    expect(screen.getByText('あなた')).toBeInTheDocument();
    
    // 青いスタイルが適用されるか（ユーザーメッセージのスタイル）
    const messageContainer = screen.getByText('これはユーザーメッセージです').closest('div');
    expect(messageContainer).toHaveClass('bg-blue-50');
  });

  it('renders assistant message correctly with markdown', () => {
    render(<ChatMessage message={assistantMessage} />);
    
    // マークダウンが解釈されるか（**bold**）
    const boldText = screen.getByText('回答');
    expect(boldText.tagName).toBe('STRONG');
    
    // アシスタントとして表示されるか
    expect(screen.getByText('アシスタント')).toBeInTheDocument();
    
    // 白いスタイルが適用されるか（アシスタントメッセージのスタイル）
    const messageContainer = screen.getByText(/これはアシスタントの/).closest('div');
    expect(messageContainer).toHaveClass('bg-white');
  });

  it('shows sources when button is clicked', () => {
    render(<ChatMessage message={assistantMessage} />);
    
    // 初期状態では参照元は表示されていない
    expect(screen.queryByText('これはソース文書の内容です')).not.toBeInTheDocument();
    
    // 参照元を表示ボタンをクリック
    fireEvent.click(screen.getByText('参照元を表示'));
    
    // 参照元が表示される
    expect(screen.getByText('これはソース文書の内容です')).toBeInTheDocument();
    expect(screen.getByText('ソース文書')).toBeInTheDocument();
  });

  it('hides sources when button is clicked again', () => {
    render(<ChatMessage message={assistantMessage} />);
    
    // 参照元を表示ボタンをクリック
    fireEvent.click(screen.getByText('参照元を表示'));
    expect(screen.getByText('これはソース文書の内容です')).toBeInTheDocument();
    
    // もう一度クリックして非表示にする
    fireEvent.click(screen.getByText('参照元を隠す'));
    expect(screen.queryByText('これはソース文書の内容です')).not.toBeInTheDocument();
  });

  it('does not show sources button for messages without sources', () => {
    render(<ChatMessage message={userMessage} />);
    
    // 参照元を表示ボタンがない
    expect(screen.queryByText('参照元を表示')).not.toBeInTheDocument();
  });
});
