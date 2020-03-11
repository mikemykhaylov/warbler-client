import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.reducer';

const reactMiddleware = [applyMiddleware(thunk)];

if (process.env.NODE_ENV !== 'production') {
  reactMiddleware.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
      }),
  );
}

export default function configureStore() {
  const store = createStore(rootReducer, compose(...reactMiddleware));
  return store;
}
