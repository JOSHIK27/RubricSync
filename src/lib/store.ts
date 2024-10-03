import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/CounterSlice";
import { FeedbackSlice } from "./features/dashboards/FeedbackSlice";
import { FilteredFeedbackSlice } from "./features/dashboards/FilteredFeedbackSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
      feedback: FeedbackSlice.reducer,
      filteredFeedback: FilteredFeedbackSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
