import { wretchNextInstance } from 'util/wretch';
import { generate } from 'random-words';

const generatedTopics = generate(20);
const fetchBase64 = async (imgUrl: string) => {
  try {
    const g = await wretchNextInstance.options({ headers: { extra: 'extra' } }).get(`/common?imgUrl=${imgUrl}`);
    if (g) return g;
  } catch (e) {
    console.log('base64 error', e);
  }
};

export { generatedTopics, fetchBase64 };
