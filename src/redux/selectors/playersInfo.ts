import memoize from 'fast-memoize';
import { createSelector } from 'reselect';
import { compose, entries, get, getOr, reduce } from 'lodash/fp';
import { State } from '../types';
import { playerInfoInitialState, PlayersInfoState } from '../reducers/playersInfo';
import { PlayerInfo } from '../actions/playersInfo';

export const getPlayersInfoState = (state: State) => state.playersInfo;

const getPlayerInfoBase = (id: number) => createSelector(
    getPlayersInfoState,
    getOr(playerInfoInitialState, id),
);
export const getPlayerInfo = memoize(getPlayerInfoBase);

const getPlayerDurationSecondsBase = (id: number) => createSelector(
    getPlayerInfo(id),
    get('durationSeconds'),
);
export const getPlayerDurationSeconds = memoize(getPlayerDurationSecondsBase);

const getPlayerPlayedTimeBase = (id: number) => createSelector(
    getPlayerInfo(id),
    ({ playedSeconds, playedFraction }: PlayerInfo) => ({ playedSeconds, playedFraction }),
);
export const getPlayerPlayedTime = memoize(getPlayerPlayedTimeBase);

const getPlayerLoadedTimeBase = (id: number) => createSelector(
    getPlayerInfo(id),
    ({ loadedSeconds, loadedFraction }: PlayerInfo) => ({ loadedSeconds, loadedFraction }),
);
export const getPlayerLoadedTime = memoize(getPlayerLoadedTimeBase);

export const getMaxDurationPlayerId = createSelector<State, PlayersInfoState, string | null>(
    getPlayersInfoState,
    compose(
        get('id'),
        reduce<[string, PlayerInfo], { duration: number; id: string | null }>(
            (acc, curr) => {
                const [playerId, playerInfo] = curr;

                if (playerInfo.durationSeconds > acc.duration) {
                    return {
                        duration: playerInfo.durationSeconds,
                        id: playerId,
                    };
                }

                return acc;
            },
            { duration: 0, id: null },
        ),
        entries,
    ),
);

export const getMaxDuration = createSelector(
    getPlayersInfoState,
    getMaxDurationPlayerId,
    (playersInfo: PlayersInfoState, maxDurationPlayerId: string | null) => maxDurationPlayerId ? get(maxDurationPlayerId, playersInfo).durationSeconds : 0,
);
