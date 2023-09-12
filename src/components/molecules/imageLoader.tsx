import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { wretchNextInstance } from 'util/wretch';

import { styled } from '@mui/system';

type ImageUrlProps = {
  imgUrl: string;
  blurUrl?: string;
};

export default function ImageLoader({ imgUrl, blurUrl }: ImageUrlProps) {
  const [blurImg, setBlurImg] = useState<any>('');
  const [loaded, setLoaded] = useState(false);

  const SytledLoaderImageWrap = styled('div')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: '1rem',
  }));

  return (
    <SytledLoaderImageWrap>
      <Image
        src={imgUrl}
        alt='cafe image'
        width={0}
        height={0}
        sizes='100vw'
        blurDataURL={blurUrl}
        placeholder='blur'
        style={{ width: '100%', height: loaded ? 'auto' : '10rem', objectFit: 'cover' }}
        onLoad={e => setLoaded(true)}
        onError={e => <span>error</span>}
      />
    </SytledLoaderImageWrap>
  );
}
