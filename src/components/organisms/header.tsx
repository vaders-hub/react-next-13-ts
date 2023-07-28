'use client';

import * as React from 'react';
import ModeSwitch from 'components/atoms/modeSwitch';
import { styled } from '@mui/system';
import { useBears, useBearActions, useTheme } from 'store/index';

interface IHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const plainHeader = ({ className, children }: IHeaderProps) => <header className={className}>{children}</header>;

const StyledHeader = styled(plainHeader)`
  padding: 10px;
  background-color: yellow;
`;

function BearCounter() {
  const mode = useTheme();
  const bears = useBears();
  const { increasePopulation } = useBearActions();
  return (
    <h1>
      {bears} around here ... {mode}
    </h1>
  );
}

export default function Header() {
  return (
    <>
      <StyledHeader>
        <BearCounter />
        <ModeSwitch />
      </StyledHeader>
    </>
  );
}
