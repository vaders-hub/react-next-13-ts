'use client';
import Header from 'components/organisms/header';
import Progress from 'components/molecules/progress';
import Drawer from 'components/molecules/drawer';
import Modal from 'components/molecules/modal';

const CommonContext = () => {
  console.log('CommonContext');
  return (
    <>
      <Header />
      <Progress />
      <Drawer />
      <Modal />
    </>
  );
};

export default CommonContext;
