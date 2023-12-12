import { wretchNextInstance } from 'util/wretch';
import { generate } from 'random-words';

const generatedTopics = [
  'sudden',
  'grain',
  'rhyme',
  'tip',
  'plain',
  'find',
  'character',
  'ring',
  'tried',
  'driven',
  'suggest',
  'flight',
  'break',
  'sides',
  'joined',
  'trouble',
  'supper',
  'similar',
  'gravity',
  'threw',
]; //generate(20);

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
