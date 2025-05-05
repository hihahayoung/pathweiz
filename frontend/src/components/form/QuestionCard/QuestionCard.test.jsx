import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionCard from './QuestionCard';

vi.mock('./questions', () => ({
  getQuestions: () => ([
    {
      id: 'test1',
      type: 'text',
      render: () => <div>Question 1</div>
    },
    {
      id: 'test2',
      type: 'text',
      render: () => <div>Question 2</div>
    }
  ])
}));

describe('QuestionCard', () => {
  const defaultProps = {
    currentQuestion: 0,
    formData: {},
    handleInputChange: vi.fn(),
    handlePrevious: vi.fn(),
    handleNext: vi.fn(),
    isFirstQuestion: true,
    isLastQuestion: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders current question', () => {
    render(<QuestionCard {...defaultProps} />);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
  });

  it('shows proper navigation buttons', () => {
    render(<QuestionCard {...defaultProps} />);
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('shows submit button on last question', () => {
    render(
      <QuestionCard 
        {...defaultProps} 
        currentQuestion={1}
        isFirstQuestion={false}
        isLastQuestion={true}
      />
    );
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('handles navigation button clicks', async () => {
    render(
      <QuestionCard 
        {...defaultProps}
        isFirstQuestion={false}
      />
    );
    
    await userEvent.click(screen.getByText('Next'));
    expect(defaultProps.handleNext).toHaveBeenCalled();

    await userEvent.click(screen.getByText('Previous'));
    expect(defaultProps.handlePrevious).toHaveBeenCalled();
  });
});