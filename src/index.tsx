import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './core/reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
  apiKey: 'AIzaSyCcSTLPZe3v66zqqyIEtrcr3N3NJWasR38',
  authDomain: 'internship-3739d.firebaseapp.com',
  databaseURL: 'https://internship-3739d.firebaseio.com',
  projectId: 'internship-3739d',
  storageBucket: 'internship-3739d.appspot.com',
  messagingSenderId: '28527181698',
  appId: '1:28527181698:web:8b8c0e80bd87ce1e4dd99b',
  measurementId: 'G-449MWYGPNW',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-underscore-dangle
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
