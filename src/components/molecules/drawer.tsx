'use client';

import Drawer from '@mui/material/Drawer';

export default function CustomDrawer() {
  return (
    <>
      <Drawer anchor={'left'} open={false}>
        <ul>
          <li>1234</li>
          <li>5678</li>
        </ul>
      </Drawer>
    </>
  );
}
