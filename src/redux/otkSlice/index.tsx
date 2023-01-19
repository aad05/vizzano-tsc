import { createSlice } from "@reduxjs/toolkit";

interface OTKSelectType {
  _id?: string;
  things?: number;
  productName?: string;
  fake?: number;
}

type otkState = {
  selectedData: OTKSelectType;
};
const initialState: otkState = {
  selectedData: {},
};

const otkSlice = createSlice({
  name: "otkSlice",
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

export const { switchSelectedData, updateSelectedData } = otkSlice.actions;

export default otkSlice.reducer;
