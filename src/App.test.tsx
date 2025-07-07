
import { render, screen, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test('renders App component', async () => {
  render(<App />);
  await waitFor(() => {
    const linkElement = screen.getByText(/RevolutAging/i);
    expect(linkElement).toBeInTheDocument();
  });
});
