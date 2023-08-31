import type { Metadata } from 'next';
import type { ILayout } from 'types/common';

import 'asset/styles/login.css';

export default function LoginLayout({ children }: ILayout) {
  return <>{children}</>;
}
