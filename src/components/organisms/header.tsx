'use client';

import * as React from 'react';
import ModeSwitch from 'components/atoms/modeSwitch';
import { styled } from '@mui/system';

interface IHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const plainHeader = ({ className, children }: IHeaderProps) => <header className={className}>{children}</header>;

const StyledHeader = styled(plainHeader)`
  padding: 10px;
  background-color: yellow;
`;

export default function Header() {
  return (
    <>
      <StyledHeader>
        <ModeSwitch />
      </StyledHeader>
    </>
  );
}
