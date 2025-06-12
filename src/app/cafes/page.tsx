import headerInfo from 'util/headerInfo';
import Title from 'components/atoms/title';
import SearchBox from 'components/molecules/searchBox';
import List from 'components/organisms/cafe/list';

export default async function Cafe() {
  const fetchedHeaderInfo = await headerInfo();

  console.log('fetchedHeaderInfo cafe', SearchBox);

  return (
    <main data-testid='cafes'>
      <Title title={'Cafes'} />
      <List />
    </main>
  );
}
