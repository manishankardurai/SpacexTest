import path from 'path';
import express from 'express';
import helmet from 'helmet';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import { handleSSR } from './handleSSR.js';
import { handleCSR } from './handleCSR.js';
import { getSpaceLaunchData } from '../src/actions/index.js';

import { configureStore } from '../src/store/configure-store.js';
import { serverRenderer } from './handleSSR.js';
const { env } = require('../config');

require('./setup').setup();

const app = express();
const router = express.Router();

router.use(helmet());
router.use(responseTime());
router.use(cors());
router.use(cookieParser());

const actionGetLauchData = (req, res, next) => {
  const { store } = configureStore(true, {}, req.url);
  store
    .dispatch(getSpaceLaunchData())
    .then((response) => {
      serverRenderer(store)(req, res, next);
    })
    .catch(error => {
      console.log('error in fetching', error.message)
      if (error.response && error.response.status === 404) {
        serverRenderer(store, false, true)(req, res, next);
      } else {
        serverRenderer(store)(req, res, next);
      }
    });
};


app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  bodyParser.json({
    limit: '5mb',
  })
);

app.engine(
  'html',
  handlebars({
    helpers: {
      toJson: object => JSON.stringify(object),
    },
  })
);
app.set('view engine', 'html');

router.use(
  express.static(path.join(__dirname, '../', 'dist'), {
    redirect: false,
  })
);
router.use(
  express.static(path.join(__dirname, '../', 'assets'), {
    redirect: false,
  })
);

router.get('/home', actionGetLauchData);

app.use((req, res, next) => {
  if (req.url == '/') {
    res.redirect('/home');
    return;
  }
  next();
});

require('./routes')(router);

if (env.SERVER_RENDERED) {

  router.use('*', handleSSR);
} else {
  // Client Side Rendering 🚨
  router.get('*', handleCSR);
}

app.use(router);

app.shutdown = () => {
  require('./setup').teardown(); // eslint-disable-line global-require
};

module.exports = {
  app,
};
