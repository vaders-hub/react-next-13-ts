import ModeSwitch from 'components/atoms/modeSwitch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Header() {
  return (
    <>
      <header className='header'>
        <ModeSwitch />
      </header>
    </>
  );
}
