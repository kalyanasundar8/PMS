import { IncomeActionTypes } from "../contants/Income.actions.types";

export const setIncome = (income) => {
  return {
    type: IncomeActionTypes.SET_INCOME,
    payload: income,
  };
};

export const setLoading = (loading) => {
  return {
    type: IncomeActionTypes.SET_LOADING,
    payload: loading,
  };
};

export const setError = (error) => {
  return {
    type: IncomeActionTypes.SET_ERROR,
    payload: error,
  };
};
