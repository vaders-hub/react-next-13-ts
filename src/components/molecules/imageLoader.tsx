import React, { useState } from 'react';
import Image from 'next/image';
import { styled } from '@mui/system';
import LoadingSpin from 'asset/images/giphy.gif';

type ImageUrlProps = {
  imgUrl: string;
};

const SytledLoaderImage = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 'calc(100% - 2rem)',
}));

export default function ImageLoader({ imgUrl }: ImageUrlProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <SytledLoaderImage>
          <Image
            src={LoadingSpin}
            alt='cafe image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
          />
        </SytledLoaderImage>
      )}
      <Image
        src={imgUrl}
        alt='cafe image'
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
        onLoad={e => setLoaded(true)}
      />
    </>
  );
}
