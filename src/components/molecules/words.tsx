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

export default function Words(props: any) {
  const [topics, setTopics] = useState<string[]>([]);

  // props.onSelected(topics[0]);

  const handleClick = (index: number) => {
    props.onSelected(topics[index]);
  };

  useEffect(() => {
    const topics = generate(20);

    setTopics(topics);
  }, []);

  return (
    <>
      <StyledStack direction='row'>
        {topics.map((topic, index) => (
          <StyledChip key={index} label={topic} onClick={e => handleClick(index)} />
        ))}
      </StyledStack>
    </>
  );
}
