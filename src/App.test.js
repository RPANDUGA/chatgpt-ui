import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

// Mock Axios
jest.mock('axios');

describe('App Component', () => {
  test('renders the app with a title and input field', () => {
    render(<App />);

    // Check if the title is rendered
    expect(screen.getByText(/ChatGPT UI/i)).toBeInTheDocument();

    // Check if input field is present
    expect(screen.getByPlaceholderText(/Type your message here.../i)).toBeInTheDocument();

    // Check if the send button is present
    expect(screen.getByText(/Send/i)).toBeInTheDocument();
  });

  test('sends a message and displays the response', async () => {
    // Mock API response
    const mockResponse = {
      data: {
        choices: [
          { message: { content: 'Hello! How can I help you today?' } },
        ],
      },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<App />);

    // Type a message in the input field
    const inputField = screen.getByPlaceholderText(/Type your message here.../i);
    fireEvent.change(inputField, { target: { value: 'Hello, ChatGPT!' } });

    // Click the Send button
    const sendButton = screen.getByText(/Send/i);
    fireEvent.click(sendButton);

    // Wait for the message and response to appear
    await waitFor(() => {
      expect(screen.getByText(/Hello, ChatGPT!/i)).toBeInTheDocument(); // User message
      expect(screen.getByText(/Hello! How can I help you today?/i)).toBeInTheDocument(); // Assistant response
    });
  });

  test('displays an error message when the API fails', async () => {
    // Mock API error
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    render(<App />);

    // Type a message in the input field
    const inputField = screen.getByPlaceholderText(/Type your message here.../i);
    fireEvent.change(inputField, { target: { value: 'Hello, ChatGPT!' } });

    // Click the Send button
    const sendButton = screen.getByText(/Send/i);
    fireEvent.click(sendButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error communicating with server\./i)).toBeInTheDocument();
    });
  });
});
