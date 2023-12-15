'use client';

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useQueryState } from 'next-usequerystate';
import { usePageLoaded, usePageLoadActions } from 'store';
import { generatedTopics, fetchBase64 } from 'util/common';
import usePrevious from 'hooks/usePrevious';

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
  const { setPageLoad } = usePageLoadActions();
  const searchParams = useSearchParams();
  const searchTopic = searchParams.get('topic');
  const previousTopic = usePrevious(searchTopic);
  const [mounted, setMounted] = useState(false);

  const handleClick = useCallback(
    (topic: string) => {
      const params = new URLSearchParams(`topic=${topic}`);

      setPageLoad(true);
      router.push(`/news?topic=${topic}`);
    },
    [router, setPageLoad],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
