import '../assets/styles/common/index.scss';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import serialize from 'serialize-javascript';
import App from './app';

const history = createHistory();
import { configureStore } from './store/configure-store';


const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;

history.listen(location => {
  window.scrollTo(0, 0);
});

const { historyToUse, store } = configureStore(false, preloadedState, '', history);

const rootEl = document.getElementById('app');
ReactDOM.hydrate(<App store={store} history={historyToUse} />, rootEl);
