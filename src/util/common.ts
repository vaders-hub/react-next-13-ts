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

const fetchLnb = async () => {
  const data: any = wretchNextInstance.get('/nav');

  return data;
};

const fetchBase64 = async (imgUrl: string) => {
  try {
    const g = await wretchNextInstance.options({ headers: { extra: 'extra' } }).get(`/common?imgUrl=${imgUrl}`);
    if (g) return g;
  } catch (e) {
    console.log('base64 error', e);
  }
};

export { generatedTopics, fetchLnb, fetchBase64 };
