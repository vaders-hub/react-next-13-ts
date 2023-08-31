import Link from 'next/link';

export default function Interception() {
  return (
    <>
      <Link href={'/loc/1'}>1</Link>
      <Link href={'/loc/2'}>2</Link>
    </>
  );
}
