import React, { memo, useEffect, useMemo } from 'react';

import useChange from 'hooks/useChange';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Selects(props: any) {
  const { noOfPages, onChagePageNo, onReset }: any = props;
  const pageList = useMemo(() => (noOfPages ? new Array(noOfPages).fill(0).map((_, i) => i + 1) : [1]), [noOfPages]);
  const pageSearch = useChange({ defaultValue: 1 });

  useEffect(() => {
    onChagePageNo(pageSearch.value);
  }, [pageSearch.value, onChagePageNo]);

  useEffect(() => {
    pageSearch.reset(1);
  }, [pageSearch, noOfPages]);

  return (
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
  );
}

export default memo(Selects);
