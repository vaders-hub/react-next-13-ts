import React, { Component } from 'react';

import '@testing-library/jest-dom';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import {
  fireEvent,
  getByTestId,
  getElementsByClassName,
  render,
  screen,
  waitFor,
  querySelector,
} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { renderWithClient } from './utils';
import { fetchCafe } from '../store/cafe';
// import { server } from '../../jest.setup';

import Cafes from '../app/cafes/page';
import List from '../components/organisms/cafe/list';

describe('query component', () => {
  it('successful query component', async () => {
    const { container } = renderWithClient(<Cafes />);
    const main = getByTestId(container, 'cafes');
    const title = getByTestId(main, 'title');
    const searchBox = getByTestId(main, 'search-box');

    const searchButton = getByTestId(searchBox, 'search-button');
    const pageNo = 1;

    expect(title.textContent).toBe('Cafe');

    searchButton.click();
    const data = await fetchCafe({ page: pageNo, search: '' });
    await waitFor(() => {
      const listBox = main.querySelector('.list-wrap');
      expect(listBox.getElementsByClassName('MuiPaper-root').length).toBe(6);
    });

    expect(data.current_page).toBe(pageNo);
  });
});
