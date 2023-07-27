import MUIButton from '@mui/material/Button';

interface IButtonProps {
  name: string;
}

export default function Button({ name }: IButtonProps) {
  return (
    <>
      <MUIButton sx={{ textTransform: 'none' }} variant='contained'>
        {name}
      </MUIButton>
    </>
  );
}
