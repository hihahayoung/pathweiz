// src/components/form/LikertGroup/LikertGroup.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LikertGroup from './LikertGroup';

describe('LikertGroup', () => {
  const defaultProps = {
    label: 'Test Likert Group',
    options: [
      { id: 'item1', label: 'Item 1' },
      { id: 'item2', label: 'Item 2' },
    ],
    formData: {},
    onChange: vi.fn(),
    likertStart: 'Not Important',
    likertEnd: 'Very Important'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all items and their scales', () => {
    render(<LikertGroup {...defaultProps} />);
    
    // Check main label
    expect(screen.getByText('Test Likert Group')).toBeInTheDocument();
    
    // Check items
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    
    // Check scale labels - use getAllByText since the labels appear multiple times
    const startLabels = screen.getAllByText('Not Important');
    const endLabels = screen.getAllByText('Very Important');
    
    expect(startLabels[0]).toBeInTheDocument();
    expect(endLabels[0]).toBeInTheDocument();
    
    // Verify correct number of labels
    expect(startLabels).toHaveLength(2); // One for each item
    expect(endLabels).toHaveLength(2);
  });

  it('renders all scale points for each item', () => {
    render(<LikertGroup {...defaultProps} />);
    
    // Each item should have 5 scale points
    const item1Options = screen.getAllByRole('radio', { name: /^[1-5]$/ });
    expect(item1Options).toHaveLength(10); // 5 options × 2 items
  });

  it('handles option selection', async () => {
    render(<LikertGroup {...defaultProps} />);
    
    // Select a value for first item
    const firstItemOption = screen.getAllByRole('radio', { name: '3' })[0];
    await userEvent.click(firstItemOption);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('item1', '3');
  });

  it('reflects selected values from formData', () => {
    const formData = {
      item1: '4',
      item2: '2'
    };
    
    render(<LikertGroup {...defaultProps} formData={formData} />);
    
    // Check if correct options are selected
    const item1Selected = screen.getAllByRole('radio', { name: '4' })[0];
    const item2Selected = screen.getAllByRole('radio', { name: '2' })[1];
    
    expect(item1Selected).toBeChecked();
    expect(item2Selected).toBeChecked();
  });

  it('handles empty formData gracefully', () => {
    render(<LikertGroup {...defaultProps} formData={{}} />);
    
    // Should render without errors
    expect(screen.getByText('Test Likert Group')).toBeInTheDocument();
    
    // No radio buttons should be checked
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).not.toBeChecked();
    });
  });

  it('maintains separate state for each item', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <LikertGroup {...defaultProps} onChange={onChange} />
    );

    // Select value for first item
    await userEvent.click(screen.getAllByRole('radio', { name: '3' })[0]);
    expect(onChange).toHaveBeenCalledWith('item1', '3');

    // Update component with new formData
    rerender(
      <LikertGroup 
        {...defaultProps} 
        onChange={onChange}
        formData={{ item1: '3' }}
      />
    );

    // Select value for second item
    await userEvent.click(screen.getAllByRole('radio', { name: '4' })[1]);
    expect(onChange).toHaveBeenCalledWith('item2', '4');
  });
});