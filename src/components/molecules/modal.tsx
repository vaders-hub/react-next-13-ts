'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';
import { useModal, useModalActions } from 'store/';

import { getComponent } from 'util/common';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ children }: any) {
  // const router = useRouter();
  // const pathname = usePathname();

  // const [intercepted, setIntercepted] = useState(false);

  const { visible, component, callback } = useModal();
  const { showModal, closeModal } = useModalActions();

  const ImptComponent: any = dynamic(() => import(`components/organisms/intercept/${component}`), {
    loading: () => <>Loading...</>,
  });

  /* require component test
  const loadComponent = useCallback(async () => {
    const importedModule: any = await getComponent(component);

    if (importedModule) {
      setDyc(importedModule.default);
    }
  }, [component]);
  */

  /* Interceptor test
  useEffect(() => {
    if (pathname.includes('loc')) {
      setIntercepted(true);
      showModal({ component: 'ActionForm' });
    }
    return () => {
      setIntercepted(false);
      setDyc(<></>);
      closeModal();
    };
  }, [pathname, showModal, closeModal]);
  */

  /*
  const InterceptedActions = () => {
    return (
      <>
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Intercepted
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To proceed to this website, please enter your email address here. We will send updates occasionally.
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
          <Button
            onClick={() => {
              setDyc(<></>);
              setIntercepted(false);
              closeModal();
            }}
          >
            Subscribe
          </Button>
        </DialogActions>
      </>
    );
  };
  */

  return (
    <Dialog open={visible} PaperComponent={PaperComponent} aria-labelledby='draggable-dialog-title'>
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        Title
        <Button
          onClick={() => {
            closeModal();
            callback();
          }}
        >
          close
        </Button>
      </DialogTitle>
      {/* {dyc} */}
      {component && <ImptComponent test={{ test: 'testProp' }} />}
      <div>
        <DialogActions>
          <Button autoFocus onClick={() => {}}>
            Cancel
          </Button>
          <Button onClick={() => {}}>Confirm</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
