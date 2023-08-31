import Modal from 'components/molecules/modal';

const CommonContext = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Modal />
      {children}
    </>
  );
};

export default CommonContext;
