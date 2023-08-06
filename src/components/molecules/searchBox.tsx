import { useCallback, useEffect, useMemo, useState } from 'react';

import useInput from 'hooks/useInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { styled } from '@mui/system';

import type { SearchBoxProps } from 'types/cafe';

const SearchWrapper = styled('div')`
  display: inline-flex;
  width: 100%;
  margin: 0 0 2rem 0 ;
  padding: 0 8px;
  > div:nth-of-type(1) {
    width: 55%;
    padding-right:1%;
    text-align: right;
    .MuiFormControl-root {
      width: 60%;
    }
  }
  > div:nth-of-type(2) {
    display: flex;
    width: 100px;
    align-items: center;
    justify-content: center;
    button {
      margin-top: -2px;
      height: 93%;
      background-color: #1976d2;
    }
  }
  > div:nth-of-type(3) {
    display: flex;
    padding-left:1%;
    align-items: center;
    > div {
      min-width:7rem
    }
`;

export default function SearchBox(props: SearchBoxProps) {
  const { lastPage, setCafePageNo } = props;
  const noOfPages = useMemo(() => lastPage, [lastPage]);
  const pageList = useMemo(() => (noOfPages ? new Array(noOfPages).fill(0).map((_, i) => i + 1) : [1]), [noOfPages]);
  const cafeSearch = useInput();
  const [page, setPage] = useState('1');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('ee', event);
  };
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const pageNo = event.target.value as string;

      setPage(pageNo);
      setCafePageNo(parseInt(pageNo));
    },
    [setCafePageNo],
  );

  return (
    <SearchWrapper>
      <div>
        <TextField id='outlined-search' label='Search field' type='search' {...cafeSearch} />
      </div>
      <div>
        <Button variant='contained' size='large' onClick={handleClick}>
          Search
        </Button>
      </div>
      <div>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={page}
          label='Age'
          onChange={handleChange}
        >
          {pageList?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
    </SearchWrapper>
  );
}
