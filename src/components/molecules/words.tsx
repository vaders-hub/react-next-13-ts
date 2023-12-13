'use client';

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { usePageLoaded, usePageLoadActions } from 'store';
import { generatedTopics, fetchBase64 } from 'util/common';

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
  const searchParams = useSearchParams();
  const searchTopic = searchParams.get('topic');
  const { setPageLoad } = usePageLoadActions();

  const handleClick = useCallback(
    (topic: string) => {
      const params = new URLSearchParams(`topic=${topic}`);

      router.push(`/news?topic=${topic}`);
    },
    [router],
  );

  useEffect(() => {
    if (!searchTopic) {
      router.replace(`/news?topic=${generatedTopics[0]}`);
    }

    if (searchTopic) {
      if (!generatedTopics.includes(searchTopic)) {
        router.replace(`/news?topic=${generatedTopics[0]}`);
      }
    }
  }, [searchTopic, router, generatedTopics]);

  return (
    <>
      <StyledStack direction='row'>
        {generatedTopics?.map((topic, index) => (
          <StyledChip
            key={`${topic}-${index}`}
            className={topic === searchTopic ? 'selected' : ''}
            label={topic}
            onClick={() => handleClick(topic)}
          />
        ))}
      </StyledStack>
    </>
  );
}

export default memo(Words);
