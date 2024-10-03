import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  feedbackArray: [],
};

export const FeedbackSlice = createSlice({
  name: "Feedback",
  initialState,
  reducers: {
    updateFeedbackList: (state, action: PayloadAction<any>) => {
      state.feedbackArray = action.payload;
    },
  },
});

export const { updateFeedbackList } = FeedbackSlice.actions;

export default FeedbackSlice.reducer;
