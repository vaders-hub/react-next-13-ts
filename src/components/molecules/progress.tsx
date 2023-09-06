'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePageLoaded } from 'store';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { styled } from '@mui/system';

const StyledBox = styled(Box)`
  position: fixed;
  top: 0;
  margin-left: -2rem;
  transition: all 1s;
`;

export default function Progress() {
  const pageLoaded = usePageLoaded();
  const divClass = useRef('pageLoaderWrap visible');
  const [percent, setPercent] = useState(0);
  const color = useRef('#fcaf17');
  const failedColor = useRef('#ed3f14');
  const progressTimeout: any = useRef();

  useEffect(() => {
    if (pageLoaded) {
      progressTimeout.current = setTimeout(() => {
        setPercent(0);
      }, 300);
    }

    return () => {
      clearTimeout(progressTimeout.current);
    };
  }, [pageLoaded, progressTimeout.current, setPercent]);

  useEffect(() => {
    pageLoaded ? setPercent(100) : setPercent(0);
  }, [pageLoaded, setPercent]);

  return (
    <>
      <StyledBox sx={{ width: '100%' }}>
        <div style={{ width: `${percent}%`, height: '5px', backgroundColor: 'blue' }}></div>
      </StyledBox>
    </>
  );
}
