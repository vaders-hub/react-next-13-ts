'use client';

import React from 'react';
import { useTheme } from 'store/index';

interface ChildProp {
  children: React.ReactNode;
}

export default function Wrapper({ children }: ChildProp) {
  const mode = useTheme();
  return <div>{children}</div>;
}
