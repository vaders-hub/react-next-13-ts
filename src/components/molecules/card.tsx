import * as React from 'react';
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

type CafeProps = {
  cafeDatas: any;
};

const StyledCard = styled(Card)`
  margin: 0.5rem;
  padding: 1rem;
`;

export default function BasicCard({ cafeDatas }: CafeProps) {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant='h5' component='div'>
          {cafeDatas?.company?.name}
        </Typography>
      </CardContent>
      <Image
        src={cafeDatas?.primary_image_url}
        alt='cafe image'
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
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
