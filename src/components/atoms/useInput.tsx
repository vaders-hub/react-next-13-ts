import { useCallback, useEffect, useMemo, useState } from 'react';

import TextField from '@mui/material/TextField';

export default function useInput(props: any) {
  const [value, setValue] = useState('');
  const onChange = (event: any) => {
    console.log('value, onChange: handleChange', event);
    setValue(event.target.value);
  };
  // const input = <TextField value={value} label={props.label} onChange={e => setValue(e.target.value)} {...props} />;

  return [value, onChange];
}
