import Progress from 'components/molecules/progress';
import Drawer from 'components/molecules/drawer';
import Modal from 'components/molecules/modal';

const CommonContext = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Progress />
      <Drawer />
      <Modal />
      {children}
    </>
  );
};

export default CommonContext;
