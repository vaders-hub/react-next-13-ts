import Title from 'components/atoms/title';
import SearchBox from 'components/molecules/searchBox';
import List from 'components/organisms/cafe/list';

export default function Cafe() {
  return (
    <main data-testid='cafes'>
      <Title title={'Cafes'} />
      <List />
    </main>
  );
}
