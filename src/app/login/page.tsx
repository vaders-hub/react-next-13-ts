'use client';

import React, { useCallback, useEffect, useState } from 'react';

import useInput from 'hooks/useInput';
import { fetchAuth, useSessionActions } from 'store/session';

import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginWrap = styled('div')`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginBox = styled('div')`
  display: inline-flex;

  > form div {
    margin-right: 0.2rem;
  }

  button {
    height: 99%;
    background-color: #1976d2;
  }
`;

export default function Loin() {
  const loginId = useInput();
  const loginPW = useInput();
  const { updateStatus } = useSessionActions();

  const handleClick = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const login = await fetchAuth();
        if (login) updateStatus();
      } catch (e) {}

      console.log('loginId', loginId.value, loginPW.value);
    },
    [loginId.value, loginPW.value, updateStatus],
  );

  return (
    <main style={{ height: '100%' }}>
      <LoginWrap>
        <LoginBox>
          <form onSubmit={handleClick}>
            <TextField id='outlined-id' label='ID' {...loginId} />
            <TextField id='outlined-password' label='Password' {...loginPW} />
            <Button variant='contained' size='large' type='submit'>
              Login
            </Button>
          </form>
        </LoginBox>
      </LoginWrap>
    </main>
  );
}
