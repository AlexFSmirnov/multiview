import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { masterPlayerMiddleware, offsetsMiddleware } from './middlewares';
import { rootReducer } from './state';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        thunk,
        offsetsMiddleware,
        masterPlayerMiddleware,
    )),
);
