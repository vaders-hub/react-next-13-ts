'use client';

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { generate } from 'random-words';

import { usePageLoaded, usePageLoadActions } from 'store';
import { useTopics, useSelectedTopic, useSelectedTopicActions } from 'store/news';
import useCustomRouter from 'hooks/useCustomRouter';

import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface WordsProps {
  generatedTopics: string[];
}

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

function Words({ generatedTopics }: WordsProps) {
  const router = useRouter();
  const customRouter = useCustomRouter();
  const searchParams = useSearchParams();
  const searchTopic = searchParams.get('topic');

  const { setPageLoad } = usePageLoadActions();
  const { addTopcis, setSelected } = useSelectedTopicActions();
  // const topics = useTopics();
  const selected = useSelectedTopic();
  const [localSelected, setLocalSelected] = useState<string | null>(null);

  const handleClick = useCallback(
    (topic: string) => {
      const params = new URLSearchParams(`topic=${topic}`);
      setPageLoad(true);
      setSelected(topic);
      // console.log('customRouter', customRouter);
      customRouter.push(`/news?topic=${topic}`);
    },
    [setPageLoad, setSelected, customRouter],
  );

  useEffect(() => {
    if (selected) setLocalSelected(selected);
    if (!selected) setLocalSelected(generatedTopics[0]);
  }, [selected, generatedTopics, setLocalSelected]);

  useEffect(() => {
    if (generatedTopics.length) {
      const firstTopic = generatedTopics[0];
      if (!searchTopic) {
        if (localSelected) router.push(`/news?topic=${localSelected}`);
        if (!localSelected) router.push(`/news?topic=${generatedTopics[0]}`);
      }

      if (searchTopic) {
        if (!generatedTopics.includes(searchTopic)) {
          setSelected(firstTopic);
          router.push(`/news?topic=${firstTopic}`);
        }
      }
    }
  }, [router, generatedTopics, searchTopic, localSelected, setSelected]);

  return (
    <>
      <StyledStack direction='row'>
        {generatedTopics?.map((topic, index) => (
          <StyledChip
            key={`${topic}-${index}`}
            className={topic === localSelected ? 'selected' : ''}
            label={topic}
            onClick={() => handleClick(topic)}
          />
        ))}
      </StyledStack>
    </>
  );
}

export default memo(Words);
