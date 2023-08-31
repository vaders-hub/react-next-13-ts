import { notFound } from 'next/navigation';

export default function Loc({ params }: any) {
  const { slug } = params;

  return <>{slug}</>;
}
