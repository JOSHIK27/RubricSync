import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  filteredFeedbackArray: [],
};

export const FilteredFeedbackSlice = createSlice({
  name: "FilteredFeedbacks",
  initialState,
  reducers: {
    updateFilteredFeedbackList: (state, action: PayloadAction<any>) => {
      state.filteredFeedbackArray = action.payload;
    },
  },
});

export const { updateFilteredFeedbackList } = FilteredFeedbackSlice.actions;

export default FilteredFeedbackSlice.reducer;
