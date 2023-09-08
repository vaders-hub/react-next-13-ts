'use client';

import React from 'react';
import dayjs from 'dayjs';

import { styled } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';

const StyledConfig = styled('div')(({ theme }) => ({
  margin: '1rem 0',
  textAlign: 'right',
  '& > div': { marginLeft: '0.5rem' },
}));

export default function DateConfig({ today }: { today?: string }) {
  return (
    <StyledConfig>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Start'
          defaultValue={dayjs(today)}
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
        />
        <DatePicker
          label='End'
          defaultValue={dayjs(today)}
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
        />
      </LocalizationProvider>
    </StyledConfig>
  );
}
