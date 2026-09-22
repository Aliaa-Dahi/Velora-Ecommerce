import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token");

let AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: token ?? null,
    isLoggedIn: !!token,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
});

export let auth = AuthSlice.reducer;
export let { login, logout } = AuthSlice.actions;
