import { IncomeActionTypes } from "../contants/Income.actions.types";

const initialState = {
  isLoading: false,
  isError: "",
  income: null,
};

export const incomeReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case IncomeActionTypes.SET_INCOME:
      return { ...state, income: payload };
    case IncomeActionTypes.SET_LOADING:
      return { ...state, isLoading: payload };
    case IncomeActionTypes.SET_ERROR:
      return { ...state, isLoading: false, isError: payload };
    default:
      return state;
  }
};
