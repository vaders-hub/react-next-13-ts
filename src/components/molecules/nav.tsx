'use client';

import Link from 'next/link';
import { styled } from '@mui/system';

const StyledUL = styled('ul')`
  display: inline-flex;
  padding: 0.5rem;
`;

const StyledLI = styled('li')`
  margin-right: 0.5rem;
`;

export default function Nav() {
  return (
    <StyledUL>
      <StyledLI>
        <Link href='/'>Home</Link>
      </StyledLI>
      <StyledLI>
        <Link href='/cafes'>Cafes</Link>
      </StyledLI>
      <StyledLI>
        <Link href='/news'>News</Link>
      </StyledLI>
    </StyledUL>
  );
}
