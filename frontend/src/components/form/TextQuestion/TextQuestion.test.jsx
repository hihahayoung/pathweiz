// src/components/form/TextQuestion/TextQuestion.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextQuestion from './TextQuestion';

describe('TextQuestion', () => {
  const defaultProps = {
    label: 'Test Question',
    value: '',
    placeholder: 'Enter your answer',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    render(<TextQuestion {...defaultProps} />);
    // Use getByRole instead of getByLabelText
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Test Question')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your answer')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    render(<TextQuestion {...defaultProps} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test answer');
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('displays initial value', () => {
    render(<TextQuestion {...defaultProps} value="initial value" />);
    expect(screen.getByDisplayValue('initial value')).toBeInTheDocument();
  });
});