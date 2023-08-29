import Title from 'components/atoms/title';
import List from 'components/organisms/cafe/list';

export default function Cafe() {
  return (
    <main data-testid='cafes'>
      <Title title={'Cafe'} />
      <List />
    </main>
  );
}
