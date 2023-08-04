import { useCallback, useEffect, useMemo, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { styled } from '@mui/system';

const searchBox = ({ className, children }: any) => (
  <div className={className}>
    <FormControl fullWidth sx={{ m: 1 }}>
      <TextField id='outlined-search' label='Search field' type='search' />
    </FormControl>
  </div>
);

const SearchWrapper = styled('div')`
  display: inline-flex;
  width: 100%;
  margin: 0 0 2rem 0 ;
  padding: 0 8px;
  > div:nth-of-type(1) {
    width: 60%;
    text-align: right;
    .MuiFormControl-root {
      width: 60%;
    }
  }
  > div:nth-of-type(2) {
    display: flex;
    width: 10%;
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
    width: 30%;
    align-items: center;
    > div {
      min-width:7rem
    }
`;

export default function SearchBox(props: any) {
  const { lastPage, setCafePageNo } = props;
  const noOfPages = useMemo(() => lastPage, [lastPage]);
  const pageList = useMemo(() => (noOfPages ? new Array(noOfPages).fill(0).map((_, i) => i + 1) : [1]), [noOfPages]);
  const [page, setPage] = useState('1');

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const pageNo = event.target.value as string;

      setPage(pageNo);
      setCafePageNo(pageNo);
    },
    [setCafePageNo],
  );

  return (
    <SearchWrapper>
      <div>
        <TextField id='outlined-search' label='Search field' type='search' />
      </div>
      <div>
        <Button variant='contained' size='large'>
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
