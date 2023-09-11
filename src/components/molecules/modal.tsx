'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useModal, useModalActions } from 'store/';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [intercepted, setIntercepted] = useState(false);
  const { visible, component, callback } = useModal();
  const { showModal, closeModal } = useModalActions();

  useEffect(() => {
    if (pathname.includes('loc')) {
      setIntercepted(true);
      showModal();
    }
    return () => {
      setIntercepted(false);
      closeModal();
    };
  }, [pathname]);

  return (
    <>
      <Dialog open={visible} PaperComponent={PaperComponent} aria-labelledby='draggable-dialog-title'>
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              intercepted ? router.back() : closeModal();
            }}
          >
            Cancel
          </Button>
          <Button>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
