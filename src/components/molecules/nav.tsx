'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { wretchNextInstance } from 'util/wretch';
import { generate } from 'random-words';
import { generatedTopics } from 'util/common';
import { useNav } from 'store/index';
import { useTopics, useSelectedTopic, useSelectedTopicActions } from 'store/news';
import { useContext } from 'react';
import { useStore } from 'zustand';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const StyledUL = styled('ul')`
  display: inline-flex;
  padding: 0.5rem 0;
`;

const StyledLI = styled('li')`
  margin-right: 0.5rem;
`;

function Nav() {
  const topics = useTopics();
  const selected = useSelectedTopic();
  const loadedLnb = useNav();
  const { addTopcis, setSelected } = useSelectedTopicActions();
  if (!topics.length) {
    addTopcis(generatedTopics);
    if (!selected) setSelected(generatedTopics[0]);
  }

  // const params = new URLSearchParams(`topic=${selected || topics[0]}`);

  return (
    <StyledUL>
      {loadedLnb?.map((lnb: any) => (
        <StyledLI key={lnb.name}>
          {lnb.name !== 'News' && (
            <Link href={lnb.path}>
              <Typography variant='button' display='block' gutterBottom>
                {lnb.name}
              </Typography>
            </Link>
          )}
          {lnb.name === 'News' && (
            <Link href={`${lnb.path}/${selected}`}>
              <Typography variant='button' display='block' gutterBottom>
                {lnb.name}
              </Typography>
            </Link>
          )}
        </StyledLI>
      ))}
    </StyledUL>
  );
}

export default memo(Nav);
