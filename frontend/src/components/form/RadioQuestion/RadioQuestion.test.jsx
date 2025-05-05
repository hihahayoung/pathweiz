import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioQuestion from './RadioQuestion';

describe('RadioQuestion', () => {
  const defaultProps = {
    label: 'Test Radio Question',
    name: 'test-radio',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ],
    selectedValue: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all options', () => {
    render(<RadioQuestion {...defaultProps} />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('marks the selected option as checked', () => {
    render(<RadioQuestion {...defaultProps} selectedValue="option1" />);
    const selectedOption = screen.getByLabelText('Option 1');
    expect(selectedOption).toBeChecked();
  });

  it('calls onChange when option is selected', async () => {
    render(<RadioQuestion {...defaultProps} />);
    const option = screen.getByLabelText('Option 2');
    await userEvent.click(option);
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});