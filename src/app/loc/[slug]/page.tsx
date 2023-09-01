import { notFound } from 'next/navigation';

export default function Loc({ params }: any) {
  console.log('real loc', params);
  const { slug } = params;

  return <>{slug}</>;
}
