import { AuthActionTypes } from "../contants/Auth.actions.types";

const initialState = {
  isLoading: false,
  isError: "",
  user: null,
};

export const authReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthActionTypes.SET_USER:
      return { ...state, isLoading: false, user: payload };
    case AuthActionTypes.SET_LOADING:
      return { ...state, isLoading: payload };
    case AuthActionTypes.SET_ERROR:
      return { ...state, isLoading: false, isError: payload };
    default:
      return state;
  }
};
