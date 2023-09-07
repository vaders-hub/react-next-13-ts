'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/system';

const CenteredDiv = styled('div')(({ theme }) => ({
  textAlign: 'center',
}));

export default function PageLoader() {
  return (
    <CenteredDiv>
      <CircularProgress />
    </CenteredDiv>
  );
}
