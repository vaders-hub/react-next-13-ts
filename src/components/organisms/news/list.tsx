'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNewsQuery } from 'store/news';
import { useSelectedNews } from 'store/news';
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
  const [flag, setFlag] = useState(false);
  const topic = useSelectedNews();
  const prevTopic = usePrevious(topic);
  const { isFetching, isLoading, isError, data } = useNewsQuery(
    {
      q: topic,
      from: '2023-08-16',
      to: '2023-08-16',
      sortBy: 'popularity',
      page: 1,
      pageSize: 10,
    },
    flag,
  );

  const severDatas = initialData?.articles;
  const clientDatas = useMemo(() => data?.articles || [], [data]);
  const subDatas = useMemo(() => [...severDatas, ...clientDatas], [severDatas, clientDatas]);

  const fetchMore = () => {
    setFlag(prev => !prev);
  };

  useEffect(() => {
    if (prevTopic && topic !== prevTopic) {
      console.log('conditional topic', topic, prevTopic);
      severDatas.splice(0);
      setFlag(true);
    }
  }, [topic, prevTopic, severDatas, setFlag]);

  useEffect(() => {
    if (topic && topic !== prevTopic) {
      console.log('mounted', topic, prevTopic, subDatas, data);
      severDatas.splice(0);
      setFlag(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (!isFetching && !isLoading) setFlag(false);
  // }, [isFetching, isLoading, flag]);

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
