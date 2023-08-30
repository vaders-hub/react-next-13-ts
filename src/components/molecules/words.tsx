'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { generate } from 'random-words';

import { useTopics, useSelectedTopic, useSelectedTopicActions } from 'store/news';

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

export default function Words() {
  const router = useRouter();
  const topics = useTopics();
  const selected = useSelectedTopic();
  const { addTopcis, setSelected } = useSelectedTopicActions();

  const handleClick = useCallback(
    (topic: string) => {
      const params = new URLSearchParams(`topic=${topic}`);

      setSelected(topic);
      router.push(`/news/${topic}`);
    },
    [router, setSelected],
  );

  useEffect(() => {
    if (topics.length && selected === null) setSelected(topics[0]);
  }, [topics, setSelected]);

  return (
    <>
      <StyledStack direction='row'>
        {topics?.map((topic, index) => (
          <StyledChip
            key={`${topic}-${index}`}
            className={topic === selected ? 'selected' : ''}
            label={topic}
            onClick={() => handleClick(topic)}
          />
        ))}
      </StyledStack>
    </>
  );
}
