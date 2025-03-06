import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';

describe('Input component', () => {
  it('renders correctly', () => {
    render(<Input placeholder="テスト入力" />);
    const input = screen.getByPlaceholderText('テスト入力');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('border-input');
    expect(input).toHaveClass('bg-background');
  });

  it('accepts a value', () => {
    render(<Input value="テスト値" readOnly />);
    const input = screen.getByDisplayValue('テスト値');
    expect(input).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 'テスト');
    expect(handleChange).toHaveBeenCalledTimes(3); // 3文字分のイベント
  });

  it('supports different types', () => {
    render(<Input type="password" placeholder="パスワード" />);
    const input = screen.getByPlaceholderText('パスワード');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="無効入力" />);
    const input = screen.getByPlaceholderText('無効入力');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="カスタムクラス" />);
    const input = screen.getByPlaceholderText('カスタムクラス');
    expect(input).toHaveClass('custom-class');
  });
});
