'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePageLoaded } from 'store';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { styled } from '@mui/system';

const StyledBox = styled(Box)`
  display: none;
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

export default function Progress() {
  const pageLoaded = usePageLoaded();
  const divClass = useRef('pageLoaderWrap visible');
  const [display, setDisplay] = useState('none');
  const color = useRef('#fcaf17');
  const failedColor = useRef('#ed3f14');
  const progressTimeout: any = useRef();

  useEffect(() => {
    pageLoaded ? setDisplay('block') : setDisplay('none');
  }, [pageLoaded, setDisplay]);

  return (
    <>
      <StyledBox sx={{ display: display }}>
        <div></div>
      </StyledBox>
    </>
  );
}
