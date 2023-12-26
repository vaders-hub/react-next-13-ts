'use client';

import { useModal, useModalActions } from 'store/';

import Button from '@mui/material/Button';

export default function Interception() {
  const { showModal } = useModalActions();
  const testCallback = (param?: any) => {
    console.log('testCallback', param);
  };
  const openModal = () => {
    showModal({ component: 'ActionForm', callback: testCallback });
  };

  return (
    <>
      <div>
        <Button onClick={openModal}>Open Modal</Button>
      </div>
    </>
  );
}
