import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentsTable } from '@/components/documents/documents-table';

// モックデータ
const mockDocuments = [
  {
    id: '1',
    title: 'テスト文書',
    filename: 'test.pdf',
    fileType: 'pdf',
    fileSize: 1240000,
    uploadedBy: 'テストユーザー',
    uploadedAt: new Date('2023-01-01'),
    status: 'processed',
    collections: ['テスト', 'PDF'],
  },
];

const mockCollections = [
  { id: '1', name: 'テスト', documentCount: 5 },
  { id: '2', name: 'PDF', documentCount: 10 },
];

// コンソールスパイ
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

describe('DocumentsTable component', () => {
  beforeEach(() => {
    consoleLogSpy.mockClear();
  });

  it('renders documents correctly', () => {
    render(<DocumentsTable documents={mockDocuments} collections={mockCollections} />);
    
    // 文書のタイトルが表示されているか
    expect(screen.getByText('テスト文書')).toBeInTheDocument();
    
    // ファイル名が表示されているか
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    
    // アップロードしたユーザーが表示されているか
    expect(screen.getByText('テストユーザー')).toBeInTheDocument();
    
    // ステータスが表示されているか
    expect(screen.getByText('完了')).toBeInTheDocument();
    
    // コレクションが表示されているか
    expect(screen.getByText('テスト')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
  });

  it('renders empty state when no documents', () => {
    render(<DocumentsTable documents={[]} collections={mockCollections} />);
    
    // 空の状態メッセージが表示されるか
    expect(screen.getByText('表示するドキュメントがありません')).toBeInTheDocument();
  });

  it('handles delete document action', () => {
    render(<DocumentsTable documents={mockDocuments} collections={mockCollections} />);
    
    // ドロップダウンメニューを開く
    fireEvent.click(screen.getByRole('button', { name: '' })); // More button
    
    // 削除オプションをクリック
    fireEvent.click(screen.getByText('削除'));
    
    // 削除ハンドラーが呼ばれたか
    expect(consoleLogSpy).toHaveBeenCalledWith('Delete document 1');
  });

  it('handles edit document action', () => {
    render(<DocumentsTable documents={mockDocuments} collections={mockCollections} />);
    
    // ドロップダウンメニューを開く
    fireEvent.click(screen.getByRole('button', { name: '' })); // More button
    
    // 編集オプションをクリック
    fireEvent.click(screen.getByText('編集'));
    
    // 編集ハンドラーが呼ばれたか
    expect(consoleLogSpy).toHaveBeenCalledWith('Edit document 1');
  });

  it('handles reprocess document action', () => {
    render(<DocumentsTable documents={mockDocuments} collections={mockCollections} />);
    
    // ドロップダウンメニューを開く
    fireEvent.click(screen.getByRole('button', { name: '' })); // More button
    
    // 再処理オプションをクリック
    fireEvent.click(screen.getByText('再処理'));
    
    // 再処理ハンドラーが呼ばれたか
    expect(consoleLogSpy).toHaveBeenCalledWith('Reprocess document 1');
  });
});
