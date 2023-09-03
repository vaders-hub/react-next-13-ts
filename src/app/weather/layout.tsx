import type { Metadata } from 'next';
import type { ILayout } from 'types/common';

export default function InterceptionLayout({ children }: ILayout) {
  return <>{children}</>;
}
