'use client';

import { useModal, useModalActions } from 'store/';
import Button from '@mui/material/Button';

export default function Lazy() {
  const { showModal } = useModalActions();
  const onClickButton = () => {
    showModal();
  };
  return (
    <>
      <Button onClick={onClickButton}>open modal</Button>
    </>
  );
}
