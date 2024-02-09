import { configureStore, createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "user",
  initialState: { isLogin: false },
  reducers: {
    login(state, action) {
      state.isLogin = true;
    },
    logout(state, action) {
      state.isLogin = false;
    },
  },
});
export const actions = loginSlice.actions;
const store = configureStore({ reducer: loginSlice.reducer });
export default store;
