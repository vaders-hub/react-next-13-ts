import Title from 'components/atoms/title';
import FormTest from 'components/organisms/forms/FormTest';

export default function Forms() {
  return (
    <main data-testid='forms'>
      <Title title={'Forms'} />
      <FormTest />
    </main>
  );
}
