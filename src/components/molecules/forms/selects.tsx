import React, { memo, useEffect, useMemo, useState } from 'react';

import usePrevious from 'hooks/usePrevious';
import useChange from 'hooks/useChange';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Selects(props: any) {
  const { noOfPages, onChagePageNo, words } = props;
  const previousWords = usePrevious(words);
  const selectList = useMemo(() => (noOfPages ? new Array(noOfPages).fill(0).map((_, i) => i + 1) : [1]), [noOfPages]);
  const selected = useChange({ defaultValue: 1 });

  if (selected.value) {
    onChagePageNo(selected.value);
  }

  if (previousWords !== undefined && previousWords !== words) {
    if (selected.value !== 1) selected.reset(1);
  }

  return (
    <Select
      labelId='page-select-label'
      id='page-select'
      label='Page'
      value={noOfPages ? selected.value : ''}
      onChange={selected.onChange}
    >
      {selectList?.map((item, index) => (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
}

export default Selects;
