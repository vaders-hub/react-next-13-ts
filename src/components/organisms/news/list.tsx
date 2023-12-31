'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useNewsQuery } from 'store/news';
import { useModal, useModalActions } from 'store/';
import { useSelectedTopic } from 'store/news';
import usePrevious from 'hooks/usePrevious';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImageLoader from 'components/molecules/imageLoader';

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledTextBox = styled(Typography)(({ theme }: any) => ({
  paddingBottom: '1rem',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}));

const StyledImageLoader = styled('div')(({ theme }: any) => ({
  position: 'relative',
  height: '15rem',
  overflow: 'hidden',
  '& div': {
    // position: 'relative',
    // width: '100%',
    // height: 'auto',
    // marginTop: '-9rem',
    // paddingBottom: '0',
    // overflow: 'auto',
  },
}));

export default function List({ initialData }: any) {
  const { showModal } = useModalActions();
  const searchParams = useSearchParams();
  const searchTopic = searchParams.get('topic');
  const severDatas = initialData;
  const subDatas = useMemo(() => [...severDatas], [severDatas]);

  // const param = {
  //   q: 'search',
  //   from: '2023-12-10',
  //   to: '2023-12-12',
  //   sortBy: 'popularity',
  //   page: 1,
  //   pageSize: 10,
  // };

  // const { isLoading, isError, data } = useNewsQuery(param, true);

  return (
    <>
      {subDatas ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {subDatas?.map((article, index) => (
              <Grid xs={2} sm={2} md={4} key={index}>
                <Item>
                  <StyledTextBox sx={{ fontSize: 14 }} color='text.secondary' gutterBottom title={article?.title}>
                    {article?.title}
                  </StyledTextBox>
                  {!article?.urlToImage && <p>NO IMAGE</p>}
                  {article?.urlToImage && article?.blurImg && (
                    <StyledImageLoader>
                      <ImageLoader imgUrl={article?.urlToImage} blurUrl={article?.blurImg} />
                    </StyledImageLoader>
                  )}
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <p></p>
      )}
      {/* <div style={{ textAlign: 'center' }}>
        <Button size='small' onClick={fetchMore}>
          Load More
        </Button>
      </div> */}
    </>
  );
}
