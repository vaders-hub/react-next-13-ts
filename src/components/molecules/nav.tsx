import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { wretchNextInstance } from 'util/wretch';
import { generate } from 'random-words';
import { generatedTopics } from 'util/common';
import { useNav } from 'store/index';
import { useTopics, useSelectedTopic, useSelectedTopicActions } from 'store/news';
import { useContext } from 'react';
import { useStore } from 'zustand';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';

const StyledUL = styled('ul')`
  display: inline-flex;
  padding: 0.5rem 0;
`;

const StyledLI = styled('li')`
  margin-right: 0.5rem;
`;

function Nav() {
  const router = useRouter();
  const loadedLnb = useNav();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback(
    (url?: string) => {
      setAnchorEl(null);
      if (url) router.push(url);
    },
    [router],
  );

  useEffect(() => {
    document.body.addEventListener('click', () => handleClose());
    return () => {
      document.body.removeEventListener('click', () => handleClose());
    };
  }, [handleClose]);

  return (
    <>
      {loadedLnb && (
        <StyledUL>
          {loadedLnb?.map((lnb: any, index: number) => (
            <StyledLI key={lnb.name}>
              {lnb.path ? (
                <Link href={`${lnb.path}`}>
                  <Typography variant='button' display='block' gutterBottom>
                    {lnb.name}
                  </Typography>
                </Link>
              ) : (
                <>
                  <a href='' onClick={handleClick}>
                    <Typography variant='button' display='block' gutterBottom>
                      {lnb.name}
                    </Typography>
                  </a>
                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    {lnb?.sub?.map((item: any, index: number) => (
                      <MenuItem key={`${item}-${index}`} onClick={() => handleClose(item.path)}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </StyledLI>
          ))}
        </StyledUL>
      )}
    </>
  );
}

export default memo(Nav);
