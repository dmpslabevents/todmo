import { createSlice } from "@reduxjs/toolkit";

const visitorInfo = createSlice({
  name: "visitor",
  initialState: {
    email: null,
    name: null,
    card: null,
  },
  reducers: {
    visitorSet(state, action) {
      if (
        action.payload.name !== undefined &&
        action.payload.name !== state.name
      ) {
        state.name = action.payload.name;
      }
      if (
        action.payload.email !== undefined &&
        action.payload.email !== state.email
      ) {
        state.email = action.payload.email;
      }
      if (
        action.payload.card !== undefined &&
        action.payload.card !== state.card
      ) {
        state.card = action.payload.card;
      }
    },
    visitorCls(state, action){
      state.name = null;
      state.email = null;
      state.card = null;
    }
  },
});

export const { visitorCls,visitorSet} = visitorInfo.actions;
export default visitorInfo.reducer;
