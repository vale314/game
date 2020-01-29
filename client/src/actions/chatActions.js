import shortid from "shortid";

import {
  ENDTOSESSION,
  STARTSESSION,
  GENERATEIDROOM,
  UPDATEIDROOM,
  DELETEIDROOM,
  CHANGEVAR
} from "./types";

export const generateIdRoom = () => dispatch => {
  const key = shortid.generate();
  dispatch({ type: GENERATEIDROOM, payload: key });
};

// Load User
export const startSession = payload => dispatch => {
  dispatch({ type: STARTSESSION, payload: payload });
};

export const changeVar = payload => dispatch => {
  dispatch({ type: CHANGEVAR, payload: payload });
};

// Clear Errors
export const endSession = () => dispatch => dispatch({ type: ENDTOSESSION });

export const updateIdRoom = payload => dispatch =>
  dispatch({ type: UPDATEIDROOM, payload });

export const deleteIdRoom = () => dispatch => {
  dispatch({ type: DELETEIDROOM });
};
