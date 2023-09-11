import React, { useState } from 'react';
import Image from 'next/image';
import { styled } from '@mui/system';
import LoadingSpin from 'asset/images/giphy.gif';

type ImageUrlProps = {
  imgUrl: string;
};

export default function ImageLoader({ imgUrl }: ImageUrlProps) {
  const [loaded, setLoaded] = useState(false);

  const SytledLoaderImageWrap = styled('div')(({ theme }) => ({
    position: 'relative',
    height: loaded ? 'auto' : '20rem',
    overflow: 'hidden',
    paddingBottom: '1rem',
  }));

  const SytledLoaderImage = styled('div')(({ theme }) => ({
    // position: 'absolute',
    // width: '100%',
    // marginTop: '-1rem',
  }));

  return (
    <SytledLoaderImageWrap>
      {imgUrl && !loaded && (
        <></>
        // <SytledLoaderImage>
        //   <Image
        //     src={LoadingSpin}
        //     alt='cafe image'
        //     width={0}
        //     height={0}
        //     sizes='100vw'
        //     style={{ width: '100%', height: 'auto' }}
        //   />
        // </SytledLoaderImage>
      )}
      {imgUrl && (
        <Image
          src={imgUrl}
          alt='cafe image'
          width={0}
          height={0}
          sizes='100vw'
          objectFit='cover'
          style={{ width: '100%', height: 'auto' }}
          onLoad={e => setLoaded(true)}
          onError={() => <span>can't load image</span>}
        />
      )}
    </SytledLoaderImageWrap>
  );
}
