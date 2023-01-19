import { createSlice } from "@reduxjs/toolkit";

interface CountWorkSelectType {
  _id?: string;
  things?: number;
  price?: number;
  isCome?: boolean;
  fullName?: string;
  fake?: number;
}

type countWorkState = {
  selectedData: CountWorkSelectType;
};
const initialState: countWorkState = {
  selectedData: {},
};

const countWorkSlice = createSlice({
  name: "countWorkSlice",
  initialState,
  reducers: {
    switchSelectedData(state, action) {
      state.selectedData = action.payload;
    },
    updateSelectedData(state, action) {
      state.selectedData = action.payload;
    },
  },
});

export const { switchSelectedData, updateSelectedData } =
  countWorkSlice.actions;

export default countWorkSlice.reducer;
