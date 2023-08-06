'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/system';

const StyledBox = styled(Box)`
  padding-left: 12px;
`;

export default function Title() {
  return (
    <StyledBox sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant='h3' gutterBottom>
        Cafe
      </Typography>
    </StyledBox>
  );
}
