import { wretchNextInstance } from 'util/wretch';
import { generate } from 'random-words';

// const generatedTopics = generate(20);
const generatedTopics = [
  'gave',
  'contrast',
  'vast',
  'means',
  'unusual',
  'well',
  'avoid',
  'grown',
  'apple',
  'parent',
  'hardly',
  'occur',
  'kind',
  'hide',
  'key',
  'special',
  'coast',
  'satellites',
  'lucky',
  'vapor',
];

const reqHeaderInfo = {};

const fetchLnb = async () => {
  const data: any = await wretchNextInstance.get('/nav');

  return data;
};

const getComponent = async (name: string) => {
  const path = await require.context('../components/organisms/', true, /\.tsx$/);

  const foundModule: any = path
    .keys()
    .filter((filename: string) => filename.includes(name))
    ?.map(path)[0];

  if (foundModule.length) return '<>Not Found</>';

  return foundModule;
};

const fetchBase64 = async (imgUrl: string) => {
  try {
    const g = await wretchNextInstance.options({ headers: { extra: 'extra' } }).get(`/common?imgUrl=${imgUrl}`);
    if (g) return g;
  } catch (e) {
    console.log('base64 error', e);
  }
};

export { generatedTopics, reqHeaderInfo, fetchLnb, getComponent, fetchBase64 };
