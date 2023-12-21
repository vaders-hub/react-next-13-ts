import React, { memo, useEffect, useMemo, useState } from 'react';

import usePrevious from 'hooks/usePrevious';
import useChange from 'hooks/useChange';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Selects(props: any) {
  const { noOfPages, onChagePageNo, words }: any = props;
  const previousWords = usePrevious(words);
  const pageList = useMemo(() => (noOfPages ? new Array(noOfPages).fill(0).map((_, i) => i + 1) : [1]), [noOfPages]);
  const pageSearch = useChange({ defaultValue: 1 });

  if (pageSearch.value) {
    onChagePageNo(pageSearch.value);
  }

  if (previousWords !== undefined && previousWords !== words) {
    if (pageSearch.value !== 1) pageSearch.reset(1);
  }

  return (
    <>
      {
        <Select
          labelId='page-select-label'
          id='page-select'
          label='Page'
          value={noOfPages ? pageSearch.value : ''}
          onChange={pageSearch.onChange}
        >
          {pageList?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      }
    </>
  );
}

export default Selects;
