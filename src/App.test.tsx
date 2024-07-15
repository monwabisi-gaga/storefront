// src/App.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders Home component when path is /', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const homeElement = screen.getByTestId('home-component');
  expect(homeElement).toBeInTheDocument();
});

test('renders UserLogin component when path is /login', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  const loginElement = screen.getByTestId('user-login-component');
  expect(loginElement).toBeInTheDocument();
});

test('renders UserRegistration component when path is /register', () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <App />
    </MemoryRouter>
  );
  const registrationElement = screen.getByTestId('user-registration-component');
  expect(registrationElement).toBeInTheDocument();
});
