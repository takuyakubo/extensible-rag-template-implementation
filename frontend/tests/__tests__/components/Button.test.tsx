import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button component', () => {
  it('renders correctly with default variant', () => {
    render(<Button>テストボタン</Button>);
    const button = screen.getByRole('button', { name: 'テストボタン' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('renders correctly with secondary variant', () => {
    render(<Button variant="secondary">セカンダリボタン</Button>);
    const button = screen.getByRole('button', { name: 'セカンダリボタン' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders correctly with outline variant', () => {
    render(<Button variant="outline">アウトラインボタン</Button>);
    const button = screen.getByRole('button', { name: 'アウトラインボタン' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-input');
  });

  it('renders correctly with destructive variant', () => {
    render(<Button variant="destructive">削除ボタン</Button>);
    const button = screen.getByRole('button', { name: '削除ボタン' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive');
  });

  it('supports different sizes', () => {
    render(<Button size="sm">小さいボタン</Button>);
    const button = screen.getByRole('button', { name: '小さいボタン' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-9');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>クリックボタン</Button>);
    const button = screen.getByRole('button', { name: 'クリックボタン' });
    
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>無効ボタン</Button>);
    const button = screen.getByRole('button', { name: '無効ボタン' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });
});
