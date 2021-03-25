import memoize from 'fast-memoize';
import { createSelector } from 'reselect';
import { compose, entries, get, getOr, reduce } from 'lodash/fp';
import { State } from '../types';
import { playerInfoInitialState, PlayersInfoState } from '../reducers/playersInfo';
import { PlayerInfo } from '../actions/playersInfo';
import { getPlayerOffset } from './offsets';
import { getMasterPlayerPlayedSeconds } from './masterPlayerInfo';

export const getPlayersInfoState = (state: State) => state.playersInfo;

const getPlayerInfoBase = (id: string) => createSelector(
    getPlayersInfoState,
    getOr(playerInfoInitialState, id),
);
export const getPlayerInfo = memoize(getPlayerInfoBase);

const getIsPlayerPlayingBase = (id: string) => createSelector(
    getPlayerInfo(id),
    getOr(false, 'isPlaying'),
);
export const getIsPlayerPlaying = memoize(getIsPlayerPlayingBase);

const getIsPlayerBufferingBase = (id: string) => createSelector(
    getPlayerInfo(id),
    getOr(false, 'isBuffering'),
);
export const getIsPlayerBuffering = memoize(getIsPlayerBufferingBase);

const getPlayerDurationSecondsBase = (id: string) => createSelector(
    getPlayerInfo(id),
    getOr(0, 'durationSeconds'),
);
export const getPlayerDurationSeconds = memoize(getPlayerDurationSecondsBase);

const getPlayerPlayedTimeBase = (id: string) => createSelector(
    getPlayerInfo(id),
    ({ playedSeconds, playedFraction }: PlayerInfo) => ({ playedSeconds, playedFraction }),
);
export const getPlayerPlayedTime = memoize(getPlayerPlayedTimeBase);

const getPlayerPlayedSecondsBase = (id: string) => createSelector(
    getPlayerPlayedTime(id),
    getOr(0, 'playedSeconds'),
);
export const getPlayerPlayedSeconds = memoize(getPlayerPlayedSecondsBase);

const getPlayerPlayedFractionBase = (id: string) => createSelector(
    getPlayerPlayedTime(id),
    getOr(0, 'playedFraction'),
);
export const getPlayerPlayedFraction = memoize(getPlayerPlayedFractionBase);

const getPlayerLoadedTimeBase = (id: string) => createSelector(
    getPlayerInfo(id),
    ({ loadedSeconds, loadedFraction }: PlayerInfo) => ({ loadedSeconds, loadedFraction }),
);
export const getPlayerLoadedTime = memoize(getPlayerLoadedTimeBase);

const getPlayerLoadedSecondsBase = (id: string) => createSelector(
    getPlayerLoadedTime(id),
    getOr(0, 'loadedSeconds'),
);
export const getPlayerLoadedSeconds = memoize(getPlayerLoadedSecondsBase);

const getPlayerLoadedFractionBase = (id: string) => createSelector(
    getPlayerLoadedTime(id),
    getOr(0, 'loadedFraction'),
);
export const getPlayerLoadedFraction = memoize(getPlayerLoadedFractionBase);

const hasPlayerEndedBase = (id: string) => createSelector(
    getPlayerInfo(id),
    getOr(false, 'hasEnded'),
);
export const hasPlayerEnded = memoize(hasPlayerEndedBase);

const getPlayerVolumeBase = (id: string) => createSelector(
    getPlayerInfo(id),
    getOr(1, 'volume'),
);
export const getPlayerVolume = memoize(getPlayerVolumeBase);

const getIsPlayerMutedBase = (id: string) => createSelector(
    getPlayerInfo(id),
    getOr(false, 'isMuted'),
);
export const getIsPlayerMuted = memoize(getIsPlayerMutedBase);

const getPlayerPendingSeeksBase = (id: string) => createSelector(
    getPlayerInfo(id),
    getOr([], 'pendingSeeks'),
);
export const getPlayerPendingSeeks = memoize(getPlayerPendingSeeksBase);

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

const shouldPlayerCurrentlyPlayBase = (id: string) => createSelector(
    getPlayerDurationSeconds(id),
    getPlayerOffset(id),
    getMasterPlayerPlayedSeconds,
    (playerDuration: number, playerOffset: number, masterPlayedSeconds: number) => (
        -playerOffset <= masterPlayedSeconds && masterPlayedSeconds <= playerDuration - playerOffset
    ),
);
export const shouldPlayerCurrentlyPlay = memoize(shouldPlayerCurrentlyPlayBase);

export const areAllCorrectPlayersPlaying = (state: State) => (
    Object.entries(getPlayersInfoState(state)).every(([playerId, playerInfo]) => (
        !shouldPlayerCurrentlyPlay(playerId)(state) || (playerInfo.isPlaying && shouldPlayerCurrentlyPlay(playerId)(state))
    ))
);
