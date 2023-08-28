import React, { Component } from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import Login from '../app/login/page';

describe('Login', () => {
  it('renders a login', () => {
    render(<Login />);

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });
});
