'use client';

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ children }: any) {
  const [open, setOpen] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    if (children) {
      setOpen(true);
      setHasChildren(true);
    }
    return () => {
      setOpen(false);
      setHasChildren(false);
    };
  }, [children]);

  return (
    <div>
      <Dialog open={open} PaperComponent={PaperComponent} aria-labelledby='draggable-dialog-title'>
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Subscribe
        </DialogTitle>
        <DialogContent>
          {hasChildren && children}
          {!hasChildren && (
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus>Cancel</Button>
          <Button>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
