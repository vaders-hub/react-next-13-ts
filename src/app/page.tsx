import Image from 'next/image';
import Logo from 'asset/images/next.svg';

export default function Home() {
  return (
    <main>
      <div>
        <Image
          className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
          src={Logo}
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
