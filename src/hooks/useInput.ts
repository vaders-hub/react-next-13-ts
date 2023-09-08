import { memo, useCallback, useEffect, useMemo, useState } from 'react';

export default function useInput() {
  const [value, setValue] = useState('');
  const input = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return { value, onInput: input };
}
