import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

describe('Card components', () => {
  it('renders Card correctly', () => {
    render(<Card>カードの内容</Card>);
    const card = screen.getByText('カードの内容');
    expect(card).toBeInTheDocument();
    expect(card.parentElement).toHaveClass('rounded-lg');
    expect(card.parentElement).toHaveClass('border');
    expect(card.parentElement).toHaveClass('bg-card');
  });

  it('renders CardHeader correctly', () => {
    render(<CardHeader>ヘッダー内容</CardHeader>);
    const header = screen.getByText('ヘッダー内容');
    expect(header).toBeInTheDocument();
    expect(header.parentElement).toHaveClass('flex');
    expect(header.parentElement).toHaveClass('flex-col');
    expect(header.parentElement).toHaveClass('space-y-1.5');
  });

  it('renders CardTitle correctly', () => {
    render(<CardTitle>タイトル</CardTitle>);
    const title = screen.getByText('タイトル');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl');
    expect(title).toHaveClass('font-semibold');
  });

  it('renders CardDescription correctly', () => {
    render(<CardDescription>説明文</CardDescription>);
    const description = screen.getByText('説明文');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('renders CardContent correctly', () => {
    render(<CardContent>コンテンツ</CardContent>);
    const content = screen.getByText('コンテンツ');
    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveClass('p-6');
    expect(content.parentElement).toHaveClass('pt-0');
  });

  it('renders CardFooter correctly', () => {
    render(<CardFooter>フッター</CardFooter>);
    const footer = screen.getByText('フッター');
    expect(footer).toBeInTheDocument();
    expect(footer.parentElement).toHaveClass('flex');
    expect(footer.parentElement).toHaveClass('items-center');
    expect(footer.parentElement).toHaveClass('p-6');
    expect(footer.parentElement).toHaveClass('pt-0');
  });

  it('combines all card components correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>カードタイトル</CardTitle>
          <CardDescription>カードの説明文</CardDescription>
        </CardHeader>
        <CardContent>カードのコンテンツ</CardContent>
        <CardFooter>カードのフッター</CardFooter>
      </Card>
    );

    expect(screen.getByText('カードタイトル')).toBeInTheDocument();
    expect(screen.getByText('カードの説明文')).toBeInTheDocument();
    expect(screen.getByText('カードのコンテンツ')).toBeInTheDocument();
    expect(screen.getByText('カードのフッター')).toBeInTheDocument();
  });
});
