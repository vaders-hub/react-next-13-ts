'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const GlobalLoadingBox = styled(Box)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  margin-left: -1rem;
  transition: all 0.5s;
  background: white;
  opacity: 0.7;
  z-index: 100;
`;

export default function Loading() {
  return <GlobalLoadingBox></GlobalLoadingBox>;
}
