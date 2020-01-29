import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";
import chatReducer from "./chat";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  chat: chatReducer
});
