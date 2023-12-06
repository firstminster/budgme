import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../utils/requestMethod";
import { toast } from "react-toastify";

// initialize the user state
export const initialState = {
  isLoading: false,
  isSuccess: false, // for monitoring the registration process.
  isError: null,
  message: "",
  transactionCreatedData: [],
  transactionHistoryData: [],
};

// Handle POST request for transaction
export const transactionCreate = createAsyncThunk(
  "transaction/transactionCreate",
  async ({ description, amount }, thunkAPI) => {
    try {
      // api call
      const response = await axiosPrivate.post("/transaction/create/", {
        description,
        amount,
      });

      console.log(response);

      if (response.data.status === 201) {
        thunkAPI.dispatch(
          notifyTransactionSuccessMessage(response.data.message)
        );
      }

      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        notifyAuthTransactionErrorMessage(error.response.data.message)
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Handle GET request for transaction history
export const transactionHistory = createAsyncThunk(
  "transaction/transactionHistory",
  async (thunkAPI) => {
    try {
      // api call
      const res = await axiosPrivate.get("/transaction/history/");

      console.log(res.data.response.history);

      if (res.data.status === 201) {
        thunkAPI.dispatch(notifyTransactionSuccessMessage(res.data.message));
      }

      return res.data.response;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        notifyAuthTransactionErrorMessage(error.response.data.message)
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Handle DELETE request for a transaction
export const transactionDelete = createAsyncThunk(
  "transaction/transactionDelete",
  async ({ id }, thunkAPI) => {
    try {
      // api call
      const res = await axiosPrivate.get(`/transaction/${id}/`);

      if (res.data.status === 201) {
        thunkAPI.dispatch(notifyTransactionSuccessMessage(res.data.message));
      }

      return res.data.response;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        notifyAuthTransactionErrorMessage(error.response.data.message)
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Redux Toolkit slice
const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo"); // deletes the user info from local storage
      state.isLoading = false;
      state.isSuccess = false;
      state.userInfo = null;
      state.isError = null;
    },
    notifyTransactionSuccessMessage: (state, action) => {
      state.message = action.payload;
      toast.success(action.payload);
    },
    notifyAuthTransactionErrorMessage: (state, action) => {
      state.message = action.payload;
      toast.error(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(transactionCreate.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(transactionCreate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactionCreatedData = payload;
      })
      .addCase(transactionCreate.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(transactionHistory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(transactionHistory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactionHistoryData = payload;
      })
      .addCase(transactionHistory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(transactionDelete.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(transactionDelete.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.transactionDeleteData = payload;
      })
      .addCase(transactionDelete.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

// destructure the slice properties
const { reducer, actions } = authUserSlice;

// exports action creators
export const {
  notifyTransactionSuccessMessage,
  notifyAuthTransactionErrorMessage,
} = actions;
export default reducer;
