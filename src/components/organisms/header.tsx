'use client';

import * as React from 'react';
import ModeSwitch from 'components/atoms/modeSwitch';
import { styled } from '@mui/system';
import { useBears, useBearActions } from 'store/index';

interface IHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const plainHeader = ({ className, children }: IHeaderProps) => <header className={className}>{children}</header>;

const StyledHeader = styled(plainHeader)`
  padding: 10px;
`;

function BearCounter() {
  const bears = useBears();
  return <h1>{bears} around here ...</h1>;
}

export default function Header() {
  return (
    <>
      <StyledHeader>
        <ModeSwitch />
      </StyledHeader>
    </>
  );
}
