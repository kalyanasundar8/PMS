import { AuthActionTypes } from "../contants/Auth.actions.types";

export const setUser = (user) => {
  return {
    type: AuthActionTypes.SET_USER,
    payload: user,
  };
};

export const setLoading = (loading) => {
  return {
    type: AuthActionTypes.SET_LOADING,
    payload: loading
  };
};

export const setError = (error) => {
  return {
    type: AuthActionTypes.SET_ERROR,
    payload: error,
  };
};
