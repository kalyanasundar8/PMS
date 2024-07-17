import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/signup", payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
