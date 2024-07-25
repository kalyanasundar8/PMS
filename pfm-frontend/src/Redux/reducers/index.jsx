import { combineReducers } from "redux";
import { authReducers } from "./Auth.reducer";
import { incomeReducers } from "./Income.reducer";

export const userReducer = combineReducers({
  user: authReducers,
  income: incomeReducers,
});
