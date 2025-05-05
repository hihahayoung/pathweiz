// src/components/form/CheckboxQuestion/CheckboxQuestion.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxQuestion from './CheckboxQuestion';

describe('CheckboxQuestion', () => {
  const defaultProps = {
    label: 'Test Checkbox Question',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    selectedValues: [],
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all options', () => {
    render(<CheckboxQuestion {...defaultProps} />);
    defaultProps.options.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('respects maxSelection limit', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <CheckboxQuestion 
        {...defaultProps} 
        selectedValues={[]} 
        onChange={onChange}
      />
    );

    // Click first option
    await userEvent.click(screen.getByLabelText('Option 1'));
    expect(onChange).toHaveBeenLastCalledWith(['option1']);
    
    // Update component with new selected values
    rerender(
      <CheckboxQuestion 
        {...defaultProps} 
        selectedValues={['option1']} 
        onChange={onChange}
      />
    );

    // Click second option
    await userEvent.click(screen.getByLabelText('Option 2'));
    expect(onChange).toHaveBeenLastCalledWith(['option1', 'option2']);
    
    // Update component with new selected values
    rerender(
      <CheckboxQuestion 
        {...defaultProps} 
        selectedValues={['option1', 'option2']} 
        onChange={onChange}
      />
    );

    // Try to click third option - should not trigger onChange
    await userEvent.click(screen.getByLabelText('Option 3'));
    expect(onChange).toHaveBeenCalledTimes(2); // Still only 2 calls
  });

  it('allows deselection even at max selections', async () => {
    const onChange = vi.fn();
    render(
      <CheckboxQuestion 
        {...defaultProps} 
        selectedValues={['option1', 'option2']} 
        onChange={onChange}
      />
    );
    
    await userEvent.click(screen.getByLabelText('Option 1'));
    expect(onChange).toHaveBeenCalledWith(['option2']);
  });

  it('uses default maxSelection of 2', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <CheckboxQuestion 
        {...defaultProps} 
        selectedValues={['option1', 'option2']} 
        onChange={onChange}
      />
    );

    // Try to select a third option
    userEvent.click(screen.getByLabelText('Option 3'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects custom maxSelection value', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <CheckboxQuestion 
        {...defaultProps} 
        selectedValues={[]} 
        onChange={onChange}
        maxSelection={3}
      />
    );

    // Should allow three selections
    await userEvent.click(screen.getByLabelText('Option 1'));
    rerender(
      <CheckboxQuestion 
        {...defaultProps} 
        selectedValues={['option1']} 
        onChange={onChange}
        maxSelection={3}
      />
    );

    await userEvent.click(screen.getByLabelText('Option 2'));
    rerender(
      <CheckboxQuestion 
        {...defaultProps} 
        selectedValues={['option1', 'option2']} 
        onChange={onChange}
        maxSelection={3}
      />
    );

    await userEvent.click(screen.getByLabelText('Option 3'));
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});