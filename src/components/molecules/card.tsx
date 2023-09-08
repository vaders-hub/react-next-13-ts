import React, { useState } from 'react';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageLoader from 'components/molecules/imageLoader';

type CafeProps = {
  cafeDatas: any;
};

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  margin: '0.5rem',
  padding: '1rem',
  '& .MuiCardContent-root': {
    padding: '0 0 0.5rem 0',
  },
}));

const StyledBookmarks = styled('div')(({ theme }) => ({
  float: 'right',
}));

export default function BasicCard({ cafeDatas }: CafeProps) {
  return (
    <StyledCard>
      <CardContent>
        <StyledBookmarks>
          <BookmarkBorderIcon />
        </StyledBookmarks>
        <Typography variant='h5' component='div'>
          {cafeDatas?.company?.name}
        </Typography>
      </CardContent>
      <ImageLoader imgUrl={cafeDatas?.primary_image_url} />
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
