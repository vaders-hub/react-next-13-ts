'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { styled } from '@mui/system';

const StyledBox = styled(Box)`
  position: fixed;
  top: 0;
`;

export default function Progress() {
  return (
    <>
      <StyledBox sx={{ width: '100%' }}>
        <LinearProgress variant='determinate' value={100} />
      </StyledBox>
    </>
  );
}
