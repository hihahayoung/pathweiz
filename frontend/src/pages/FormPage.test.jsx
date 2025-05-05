// src/pages/FormPage.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RecommendationsProvider } from '../context/recommendations/RecommendationsContext';
import FormPage from './FormPage';

// Mock dependencies
vi.mock('../services/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ 
        data: { session: { access_token: 'test-token' } },
        error: null 
      })
    }
  }
}));

// Mock fetch globally
global.fetch = vi.fn();

vi.mock('../components/form/QuestionCard/questions', () => ({
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

// Mock antd message
vi.mock('antd', () => ({
  message: {
    success: vi.fn(),
    error: vi.fn()
  },
  Spin: ({ children }) => <div data-testid="spinner">{children}</div>
}));

describe('FormPage', () => {
  const renderFormPage = () => {
    return render(
      <BrowserRouter>
        <RecommendationsProvider>
          <FormPage />
        </RecommendationsProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch.mockClear();
  });

  it('renders the form', () => {
    renderFormPage();
    expect(screen.getByText(/career development survey/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    renderFormPage();
    
    // Navigate to last question
    const nextButton = screen.getByText('Next');
    await userEvent.click(nextButton);
    
    // Submit form
    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});