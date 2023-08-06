import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useInput(opts: any) {
  const [value, setValue] = useState('');
  const input = <input value={value} onChange={e => setValue(e.target.value)} {...opts} />;

  return [value, input];
}
