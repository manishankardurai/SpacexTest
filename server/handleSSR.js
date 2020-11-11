import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import serialize from 'serialize-javascript';
import Routes from '../src/routes';
import { configureStore } from '../src/store/configure-store.js';
import { clientEnv } from '../config';


const renderFullPage = (html, preloadedState) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="utf-8">
      <title>Test project</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"> 
      <link rel="stylesheet" type="text/css" href="/main.css">
      <script type="text/javascript">
        window.GlobalEnvs = ${serialize(clientEnv)}
      </script>
    </head>
    <body>
      <div id="app">${html}</div>
      <script type="text/javascript">
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
  /</g,
  '\\u003c'
)}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
`;


export const serverRenderer = (store) => (req, res, next) => {
  const location = req.originalUrl;
  const context = {};
  const preloadedState = store.getState();
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  );
  res.status(200).send(renderFullPage(html, preloadedState));
};




const handleSSR = () => (req, res) => {
  const location = req.originalUrl;

  const initialState = { data: 'Setting Up SSR' };

  const { store } = configureStore(true, initialState);
  store.dispatch(push(location));

  serverRenderer(store);
};

export { handleSSR }; // eslint-disable-line

