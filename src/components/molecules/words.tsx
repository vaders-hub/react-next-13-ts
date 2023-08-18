'use client';

import React, { useEffect, useState } from 'react';
import { generate } from 'random-words';

import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const StyledStack = styled(Stack)`
  display: block;
  margin: 0 0 0.5rem 0;
`;

const StyledChip = styled(Chip)`
  margin: 0 0.5rem 0.5rem 0;
`;

const generateTopics = () => {
  return new Promise((res, rej) => {
    res(generate(20));
  });
};

export default function Words(props: any) {
  const topics: string[] = props?.topics;
  const handleClick = (topic: string) => {
    console.log('click', topic);
  };

  return (
    <>
      <StyledStack direction='row'>
        {topics?.map((topic, index) => (
          <StyledChip key={`${topic}-${index}`} label={topic} onClick={e => handleClick(topic)} />
        ))}
      </StyledStack>
    </>
  );
}
