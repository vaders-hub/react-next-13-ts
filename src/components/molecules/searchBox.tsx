import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useInput from 'hooks/useInput';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Selects from 'components/molecules/forms/selects';

import type { SearchBoxProps } from 'types/cafe';

const SearchWrapper = styled('div')`
  display: inline-flex;
  width: 100%;
  margin: 0 0 2rem 0;
  padding: 0 8px;
  text-align: center;

  > div {
    width: 100%;

    #outlined-search {
      width: 25rem;
    }

    button {
      margin: -2px 5px 0 5px;
      height: 99%;
      background-color: #1976d2;
    }

    #page-select {
      width: 3rem;
    }
  }
`;

function SearchBox(props: SearchBoxProps) {
  const { lastPage, setCafePageNo, setCafeSearchWords } = props;
  const noOfPages = useMemo(() => lastPage, [lastPage]);
  const cafeSearch = useInput();
  const inputRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputRef.current) {
        const inputEl = inputRef.current.querySelector('input');
        if (inputEl) setCafeSearchWords(inputEl.value);
      }
    },
    [setCafeSearchWords],
  );

  const onChagePageNo = useCallback(
    (no: string) => {
      setCafePageNo(parseInt(no));
    },
    [setCafePageNo],
  );

  return (
    <form onSubmit={handleClick}>
      <SearchWrapper>
        <div data-testid='search-box'>
          <TextField id='outlined-search' label='Search field' type='search' ref={inputRef} />
          <Button variant='contained' size='large' type='submit' data-testid='search-button'>
            Search
          </Button>
          <Selects noOfPages={noOfPages} onChagePageNo={onChagePageNo} />
        </div>
      </SearchWrapper>
    </form>
  );
}

export default memo(SearchBox);
