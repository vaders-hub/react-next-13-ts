'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { generate } from 'random-words';
import { generatedTopics } from 'util/common';
import { useTopics, useSelectedTopic, useSelectedTopicActions } from 'store/news';

import { styled } from '@mui/system';

const StyledUL = styled('ul')`
  display: inline-flex;
  padding: 0.5rem;
`;

const StyledLI = styled('li')`
  margin-right: 0.5rem;
`;

export default function Nav() {
  const topics = useTopics();
  const selected = useSelectedTopic();
  const { addTopcis, setSelected } = useSelectedTopicActions();

  if (!topics.length) {
    addTopcis(generatedTopics);
    if (!selected) setSelected(generatedTopics[0]);
  }

  // const params = new URLSearchParams(`topic=${selected || topics[0]}`);

  return (
    <StyledUL>
      <StyledLI>
        <Link href='/'>Home</Link>
      </StyledLI>
      <StyledLI>
        <Link href='/cafes'>Cafes</Link>
      </StyledLI>
      <StyledLI>
        <Link href={`/news/${selected}`}>News</Link>
      </StyledLI>
      <StyledLI>
        <Link href='/interception'>interception test</Link>
      </StyledLI>
    </StyledUL>
  );
}
