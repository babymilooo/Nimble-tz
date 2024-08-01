import { configureStore, combineReducers } from '@reduxjs/toolkit'
import contactReducer from "./reducers/ContactSlice";

const rootReducer = combineReducers({
    contactReducer

});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppSote = ReturnType<typeof setupStore>;
export type AppDispatch = AppSote['dispatch'];