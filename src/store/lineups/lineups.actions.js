import { LINEUPS_TYPES } from "./lineups.types";

export const fetchLineUpStart = (userid) => ({
  type: LINEUPS_TYPES.FETCH_LINEUPS_START,
  payload: { userid },
});

export const fetchLineUpsSuccess = (lineups) => ({
  type: LINEUPS_TYPES.FETCH_LINEUPS_SUCCESS,
  payload: lineups,
});

export const fetchLineUpsFailed = (error) => ({
  type: LINEUPS_TYPES.FETCH_LINEUPS_FAILED,
  payload: error,
});

export const createLineUpStart = (userid, taskId) => ({
  type: LINEUPS_TYPES.CREATE_LINEUPS_START,
  payload: { userid, taskId },
});

export const deleteLineUpStart = (lineupId) => ({
  type: LINEUPS_TYPES.DELETE_LINEUPS_START,
  payload: { lineupId },
});
