import { createSelector } from 'reselect';
import { get } from 'lodash/fp';
import { State } from '../types';
import { SettingsState, ControlsMode } from './types';

export const getSettingsState = (state: State) => state.settings;

export const getIsFullscreen = createSelector<State, SettingsState, boolean>(
    getSettingsState,
    get('isFullscreen'),
);

export const getControlsMode = createSelector<State, SettingsState, ControlsMode>(
    getSettingsState,
    get('controlsMode'),
);

export const getFocusedPlayerId = createSelector<State, SettingsState, string | null>(
    getSettingsState,
    get('focusedPlayerId'),
);
