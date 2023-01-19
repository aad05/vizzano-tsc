import { createSlice } from "@reduxjs/toolkit";

interface StoreSelectType {
  _id?: string;
  things?: number;
  productName?: string;
  sendedThings?: number;
}

type storeState = {
  selectedData: StoreSelectType;
};
const initialState: storeState = {
  selectedData: {},
};

const storeSlice = createSlice({
  name: "storeSlice",
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

export const { switchSelectedData, updateSelectedData } = storeSlice.actions;

export default storeSlice.reducer;
