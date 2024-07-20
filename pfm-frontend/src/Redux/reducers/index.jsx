import { combineReducers } from "redux";
import { authReducers } from "./Auth.reducer";

export const userReducer = combineReducers({
  user: authReducers,
});
