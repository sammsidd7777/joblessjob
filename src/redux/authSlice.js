import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user")
  ? (localStorage.getItem("user"))
  : null;

const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔑 Login success
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(user)); // ✅ FIX
      localStorage.setItem("token", token);
    },

    // 🚪 Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
