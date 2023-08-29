import React, { Component } from 'react';

import '@testing-library/jest-dom';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { renderWithClient } from './utils';
// import { server } from '../../jest.setup';

import Cafes from '../app/cafes/page';

describe('query component', () => {
  test('successful query component', async () => {
    const { container } = renderWithClient(<Cafes />);
    const main = getByTestId(container, 'cafes');
    const title = getByTestId(main, 'title');

    expect(title.textContent).toBe('Cafe');
  });
});
