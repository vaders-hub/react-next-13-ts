import React, { useState } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoaderImage from 'asset/images/giphy.gif';

type CafeProps = {
  cafeDatas: any;
};

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  margin: '0.5rem',
  padding: '1rem',
}));

const SytledLoaderImage = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 'calc(100% - 2rem)',
}));

export default function BasicCard({ cafeDatas }: CafeProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant='h5' component='div'>
          {cafeDatas?.company?.name}
        </Typography>
      </CardContent>
      {!loaded && (
        <SytledLoaderImage>
          <Image
            src={LoaderImage}
            alt='cafe image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
          />
        </SytledLoaderImage>
      )}
      <Image
        src={cafeDatas?.primary_image_url}
        alt='cafe image'
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
        onLoad={e => setLoaded(true)}
      />
      {/* <CardMedia component='img' image={cafeDatas?.primary_image_url} alt='Paella dish' /> */}
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {cafeDatas?.company?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More </Button>
      </CardActions>
    </StyledCard>
  );
}
