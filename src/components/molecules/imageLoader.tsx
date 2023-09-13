import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { styled } from '@mui/system';

type ImageUrlProps = {
  imgUrl: string;
  blurUrl?: string;
};

export default function ImageLoader({ imgUrl, blurUrl }: ImageUrlProps) {
  const [loaded, setLoaded] = useState(false);
  const SytledLoaderImageWrap = styled('div')(({ theme }: any) => ({
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: '1rem',
  }));

  return (
    <SytledLoaderImageWrap>
      {/* <Image
        src={imgUrl}
        alt='cafe image'
        width={0}
        height={0}
        sizes='100vw'
        blurDataURL={blurUrl ? blurUrl : ''}
        placeholder={blurUrl ? 'blur' : 'empty'}
        style={{ width: '100%', height: loaded ? 'auto' : '15rem', objectFit: 'cover' }}
        onLoad={e => setLoaded(true)}
        onError={e => <span>error</span>}
      /> */}
      <Image
        src={imgUrl}
        alt='cafe image'
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: loaded ? 'auto' : '15rem', objectFit: 'cover' }}
        onLoad={e => setLoaded(true)}
        onError={e => <span>error</span>}
      />
    </SytledLoaderImageWrap>
  );
}
