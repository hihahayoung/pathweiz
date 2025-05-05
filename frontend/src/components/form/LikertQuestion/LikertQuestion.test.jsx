import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LikertQuestion from './LikertQuestion';

describe('LikertQuestion', () => {
  const defaultProps = {
    label: 'Test Likert Question',
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' }
    ],
    formData: '',
    onChange: vi.fn(),
    likertStart: 'Not at all',
    likertEnd: 'Very much'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders scale labels and options', () => {
    render(<LikertQuestion {...defaultProps} />);
    expect(screen.getByText('Not at all')).toBeInTheDocument();
    expect(screen.getByText('Very much')).toBeInTheDocument();
    defaultProps.options.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('handles option selection', async () => {
    render(<LikertQuestion {...defaultProps} />);
    const option = screen.getByLabelText('2');
    await userEvent.click(option);
    expect(defaultProps.onChange).toHaveBeenCalledWith('2');
  });
});