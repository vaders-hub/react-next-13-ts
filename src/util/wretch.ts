import wretch from 'wretch';
import { useSessionStore } from 'store/session';

const baseUrl = 'https://jsonplaceholder.typicode.com';
const wretchInstance = wretch(baseUrl, { mode: 'cors' })
  .errorType('json')
  .resolve(r => {
    /*
      call store outside hook
      
      console.log('useSessionRoot', useSessionStore.getState());
     */

    return r.json();
  });

export { wretchInstance };
