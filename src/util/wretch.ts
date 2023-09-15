import wretch from 'wretch';
import { useSessionStore } from 'store/session';

const baseUrl = 'https://jsonplaceholder.typicode.com';
const contextMiddleware = (next: any) => (url: string, opts: any) => {
  /*
      call store outside hook
      
      console.log('useSessionRoot', useSessionStore.getState());
     */
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

const port = process.env.DEFAULT_PORT || 3001;
const nextBaseUrl = `http://localhost:${port}/api`;
const wretchNextInstance = wretch(nextBaseUrl)
  .options({ headers: { Accept: 'application/json' } })
  .errorType('json')
  .resolve(r => {
    return r.json();
  })
  .middlewares([contextMiddleware]);

export { wretchInstance, wretchNextInstance };
