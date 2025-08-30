import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transactions/TransactionSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});
