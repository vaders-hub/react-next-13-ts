'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { generate } from 'random-words';

import { useSelectedNews, useSelectedNewsActions } from 'store/news';

import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const StyledStack = styled(Stack)`
  display: block;
  margin: 0 0 0.5rem 0;

  div.selected {
    background-color: aqua;
  }
`;

const StyledChip = styled(Chip)`
  margin: 0 0.5rem 0.5rem 0;
`;

export default function Words(props: any) {
  const topics: string[] = props?.topics;
  const selected = useSelectedNews();
  const { setSelected } = useSelectedNewsActions();
  const handleClick = useCallback(
    (topic: string) => {
      setSelected(topic);
    },
    [setSelected],
  );

  useEffect(() => {
    if (topics.length && selected === null) setSelected(topics[0]);
  }, [topics, selected, setSelected]);

  return (
    <>
      <StyledStack direction='row'>
        {topics?.map((topic, index) => (
          <StyledChip
            key={`${topic}-${index}`}
            className={topic === selected ? 'selected' : ''}
            label={topic}
            onClick={e => handleClick(topic)}
          />
        ))}
      </StyledStack>
    </>
  );
}
