import React, { Component } from 'react';
import Login from '../app/login/page';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Login', () => {
  it('renders a login', () => {
    render(<Login />);

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });
});
