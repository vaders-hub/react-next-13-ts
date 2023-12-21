import { useCallback, useEffect, useMemo, useState } from 'react';

import type { SelectChangeEvent } from '@mui/material/Select';

export default function useInput(props: any) {
  const { defaultValue } = props;
  const [value, setValue] = useState(defaultValue);

  const input = (event: SelectChangeEvent<HTMLInputElement>) => {
    setValue(event?.target?.value);
  };
  const reset = (value: any) => setValue(value);

  return { value, onChange: input, reset };
}
