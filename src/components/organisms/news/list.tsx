'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNewsQuery } from 'store/news';
import { useSelectedTopic } from 'store/news';
import usePrevious from 'hooks/usePrevious';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function List({ initialData }: any) {
  const severDatas = initialData?.articles;
  const subDatas = useMemo(() => [...severDatas], [severDatas]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {subDatas?.map((article, index) => (
            <Grid xs={2} sm={2} md={4} key={index}>
              <Item>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                  {article?.title}
                </Typography>
                <CardMedia component='img' image={article?.urlToImage} alt={article?.title} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <div style={{ textAlign: 'center' }}>
        <Button size='small' onClick={fetchMore}>
          Load More
        </Button>
      </div> */}
    </>
  );
}
