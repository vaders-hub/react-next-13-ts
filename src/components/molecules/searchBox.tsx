import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import useInput from 'hooks/useInput';
import useChange from 'hooks/useChange';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';

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
  const pageList = useMemo(() => (noOfPages ? new Array(noOfPages).fill(0).map((_, i) => i + 1) : [1]), [noOfPages]);
  const cafeSearch = useInput();
  const pageSearch = useChange({ defaultValue: 1 });

  const handleClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      pageSearch.reset(1);
      setCafeSearchWords(cafeSearch?.value);
    },
    [cafeSearch.value, setCafeSearchWords],
  );

  useEffect(() => {
    setCafePageNo(parseInt(pageSearch.value));
  }, [pageSearch.value, setCafePageNo]);

  return (
    <form onSubmit={handleClick}>
      <SearchWrapper>
        <div data-testid='search-box'>
          <TextField id='outlined-search' label='Search field' type='search' {...cafeSearch} />
          <Button variant='contained' size='large' type='submit' data-testid='search-button'>
            Search
          </Button>
          <Select
            labelId='page-select-label'
            id='page-select'
            label='Page'
            value={pageSearch.value}
            onChange={pageSearch.onChange}
          >
            {pageList?.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
      </SearchWrapper>
    </form>
  );
}

export default memo(SearchBox);
