'use client';

import * as React from 'react';
import { useFavoriteToggleAction } from 'store/index';

import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Nav from 'components/molecules/nav';
import ModeSwitch from 'components/atoms/modeSwitch';
interface IHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const plainHeader = ({ className, children }: IHeaderProps) => <div className={className}>{children}</div>;

const StyledHeader = styled(plainHeader)(({ theme }) => ({
  position: 'relative',
  padding: '0.5rem 0 0.5rem 0',
  '& > ul': {
    border: '1px solid blue',
  },
  '& > div': {
    display: '-webkit-inline-box',
  },
  '& > div:nth-of-type(2)': {
    position: 'absolute',
    top: '0.9rem',
    right: '3.5rem',
  },
  '& > div:last-of-type': {
    position: 'absolute',
    right: 0,
  },
}));

const StyledFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
  width: '2rem',
  height: '2rem',
}));

export default function Header() {
  const toggleFavorite = useFavoriteToggleAction();

  return (
    <>
      <StyledHeader>
        <div>
          <Nav />
        </div>
        <div>
          <a href='#' onClick={toggleFavorite}>
            <StyledFavoriteIcon />
          </a>
        </div>
        <div>
          <ModeSwitch />
        </div>
      </StyledHeader>
    </>
  );
}
