import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./authUserSlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    transaction: transactionSlice,
  },
});
