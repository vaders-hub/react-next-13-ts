import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/system';

const searchBox = ({ className, children }: any) => (
  <div className={className}>
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor='outlined-adornment-amount'>Search</InputLabel>
      <OutlinedInput id='outlined-adornment-amount' label='Amount' />
    </FormControl>
  </div>
);

const StyledSearchBox = styled(searchBox)`
  margin-right: 14px;
`;

export default function SearchBox() {
  return <StyledSearchBox />;
}
