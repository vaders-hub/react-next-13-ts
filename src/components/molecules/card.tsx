import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BasicCard({ cafeDatas }: any) {
  return (
    <Card sx={{ maxWidth: '20rem' }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {cafeDatas?.company?.name}
        </Typography>
      </CardContent>
      <CardMedia component='img' height='194' image={cafeDatas?.primary_image_url} alt='Paella dish' />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {cafeDatas?.company?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More </Button>
      </CardActions>
    </Card>
  );
}
