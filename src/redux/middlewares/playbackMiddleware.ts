import { Middleware } from 'redux';
import { Action, State } from '../types';

export const playbackMiddleware: Middleware<{}, State> = store => next => (action: Action) => {
    const { dispatch, getState } = store;
    const state = getState();

    next(action);
};
