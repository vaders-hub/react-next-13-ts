'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: 0,
}));

interface TitleProp {
  title: string;
}

export default function Title({ title }: TitleProp) {
  return (
    <StyledBox sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant='h3' gutterBottom data-testid='title'>
        {title}
      </Typography>
    </StyledBox>
  );
}
