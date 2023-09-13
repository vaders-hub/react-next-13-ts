'use client';

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';

import { styled } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface DateConfigs {
  today?: string;
  yesterday?: string;
  [key: number | string]: unknown;
}

const StyledConfig = styled('div')(({ theme }: any) => ({
  height: '4.2vh',
  margin: '1rem 0',
  textAlign: 'right',
  '& > div': {
    marginLeft: '0.5rem',
  },
  '& > button': {
    height: '99%',
    margin: '0 5px',
    backgroundColor: '#1976d2',
  },
}));

function DateConfig({ today, yesterday }: DateConfigs) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTopic = searchParams?.get('topic');
  const [datesValue, setDatesValue] = useState<DateConfigs>({ start: yesterday, end: today });

  const onChangeDate = useCallback(
    (name: string, e: Dayjs | null) => {
      const copy: DateConfigs = JSON.parse(JSON.stringify(datesValue));
      copy[name] = dayjs(e).format('YYYY-MM-DD');

      setDatesValue(copy);
    },
    [datesValue, setDatesValue],
  );

  const onFetchTopic = () => {
    if (searchTopic) {
      const { start, end } = datesValue;
      router.push(`/news?topic=${searchTopic}&startDate=${start}&endDate=${end}`);
    }
  };

  return (
    <StyledConfig>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Start'
          defaultValue={dayjs(yesterday)}
          onChange={newValue => onChangeDate('start', newValue)}
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
        />
        <DatePicker
          label='End'
          defaultValue={dayjs(today)}
          onChange={newValue => onChangeDate('end', newValue)}
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
        />
      </LocalizationProvider>
      <Button variant='contained' size='large' type='submit' data-testid='search-button' onClick={onFetchTopic}>
        Refetch
      </Button>
    </StyledConfig>
  );
}

export default memo(DateConfig);
