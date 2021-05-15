import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './scss/index.scss';

render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
