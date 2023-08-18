'use client';

import React, { useEffect, useState } from 'react';
import { generate } from 'random-words';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Words(props: any) {
  const topics: string[] = props?.topics;
  const handleClick = (topic: string) => {
    console.log('click', topic);
  };

  return (
    <>
      <Stack direction='row' style={{ display: 'block', margin: '0 0 0.5rem 0' }}>
        {topics?.map((topic, index) => (
          <Chip
            key={`${topic}-${index}`}
            label={topic}
            style={{ margin: '0 0.5rem 0.5rem 0' }}
            onClick={e => handleClick(topic)}
          />
        ))}
      </Stack>
    </>
  );
}
