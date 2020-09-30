import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';
import './scss/index.scss';
import App from './containers/App';

render(<App />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
