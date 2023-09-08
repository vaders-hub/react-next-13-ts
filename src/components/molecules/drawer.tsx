'use client';

import { useFavoriteToggle, useFavoriteToggleAction } from 'store/index';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomDrawer() {
  const isFavoriteOpened = useFavoriteToggle();
  const toggleFavorite = useFavoriteToggleAction();

  return (
    <>
      <Drawer anchor={'left'} open={isFavoriteOpened}>
        <a
          href=''
          onClick={event => {
            event.preventDefault();
            toggleFavorite();
          }}
        >
          <CloseIcon />
        </a>
        <ul style={{ padding: '1rem' }}>
          <li>Weather</li>
          <li>Cafe</li>
          <li>News</li>
        </ul>
      </Drawer>
    </>
  );
}
