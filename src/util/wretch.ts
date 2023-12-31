import wretch from 'wretch';
import { useSessionStore } from 'store/session';
import { useCommonStore } from 'store/index';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const contextMiddleware = (next: any) => (url: string, opts: any) => {
  /*
    call store outside hook
    
    console.log('useSessionRoot', useSessionStore.getState());
    */
  // console.log('useSessionRoot');
  if (opts.context) {
    // Mutate "context"
    opts.context.property = 'anything';
  }

  return next(url, opts);
};

const wretchInstance = wretch(baseUrl, { mode: 'cors' })
  .errorType('json')
  .resolve(r => {
    return r.json();
  })
  .middlewares([contextMiddleware]);

const port = process.env.NEXT_PUBLIC_DEFAULT_PORT;
const nextBaseUrl = `http://localhost:${port}/api`;
const wretchNextInstance = wretch(nextBaseUrl)
  .options({ headers: { Accept: 'application/json' } })
  .errorType('json')
  .resolve(r => {
    // console.log('complete....');
    return r.json();
  })
  .middlewares([contextMiddleware]);

export { wretchInstance, wretchNextInstance };
