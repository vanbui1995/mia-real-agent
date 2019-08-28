/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill/noConflict';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import 'moment/locale/vi';
import FontFaceObserver from 'fontfaceobserver';
import history from './utils/history';
import SpinnerLoading from './components/PageLoading';
import GlobalStyle from './stylesheets/global-styles';

import './i18n';
// Import root app
import App from './routers';

// Import Language Provider

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./assets/images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

import configureStore from './store';
import AgentAcceptRequestContainer from './containers/AgentAcceptRequest/AgentAcceptRequestContainer';
import { DefaultThemes } from './stylesheets/themes/DefaultThemes.style';
import Translator from './containers/Translator/Translator';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const { store, persistor } = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={DefaultThemes}>
          <PersistGate loading={<SpinnerLoading />} persistor={persistor}>
            <ConnectedRouter history={history}>
              <Translator />
              <App history={history} />
              <AgentAcceptRequestContainer />
            </ConnectedRouter>
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./routers.js'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

render();
