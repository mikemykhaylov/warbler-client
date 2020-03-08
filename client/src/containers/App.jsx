import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import configureStore from '../store/index.store';
import {setCurrentUser} from '../store/actions/auth.actions';
import Navbar from './Navbar';
import Main from './Main';

const store = configureStore();

if(localStorage.getItem('jwtToken') && jwtDecode(localStorage.getItem('jwtToken'))) {
  const token = localStorage.getItem('jwtToken');
  const { id, username, profileImageUrl} = jwtDecode(token);
  store.dispatch(setCurrentUser({id, username, profileImageUrl, token}))
} else {
  store.dispatch(setCurrentUser({}))
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Main />
      </Router>
    </Provider>
  );
};

export default App;
