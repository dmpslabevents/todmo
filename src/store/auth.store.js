import { createSlice } from "@reduxjs/toolkit";

const authState = createSlice({
  name: "auth",
  initialState: {
    auth: false,
    email: null,
    name: null,
    role: null,
  },
  reducers: {
    authSet(state, action) {
      if (
        action.payload.auth !== undefined &&
        action.payload.auth !== state.auth
      ) {
        state.auth = action.payload.auth;
      }
      if (
        action.payload.email !== undefined &&
        action.payload.email !== state.email
      ) {
        state.email = action.payload.email;
      }
      if (
        action.payload.name !== undefined &&
        action.payload.name !== state.name
      ) {
        state.name = action.payload.name;
      }
      if (
        action.payload.role !== undefined &&
        action.payload.role !== state.role
      ) {
        state.role = action.payload.role;
      }
    },
    authOut(state, action){
      state.auth = null;
      state.email = null;
      state.name = null;
      state.role = null;
    }
  },
});

export const { authSet,authOut} = authState.actions;
export default authState.reducer;
