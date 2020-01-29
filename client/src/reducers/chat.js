import {
  STARTSESSION,
  ENDTOSESSION,
  GENERATEIDROOM,
  UPDATEIDROOM,
  DELETEIDROOM,
  CHANGEVAR
} from "../actions/types";

const initialState = {
  connected: false,
  socket: "",
  id_room: "",
  isX: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STARTSESSION:
      return {
        ...state,
        socket: action.payload,
        connected: true
      };
    case ENDTOSESSION:
      return {
        ...state,
        connected: false,
        socket: null
      };
    case GENERATEIDROOM:
      return {
        ...state,
        id_room: action.payload
      };
    case UPDATEIDROOM:
      return {
        ...state,
        id_room: action.payload
      };
    case DELETEIDROOM:
      return {
        ...state,
        id_room: ""
      };
    case CHANGEVAR:
      return {
        ...state,
        isX: action.payload
      };
    default:
      return state;
  }
};
