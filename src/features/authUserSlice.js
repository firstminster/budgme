import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../utils/requestMethod";
import { toast } from "react-toastify";

// initialize userToken from local storage
const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialize the user state
export const initialState = {
  userInfo: userInfoFromStorage, // for user object
  data: [],
  isLoading: false,
  isSuccess: false, // for monitoring the registration process.
  isError: null,
  message: "",
  response: "",
};

// Handle POST request for user login
export const userLogin = createAsyncThunk(
  "authUser/userLogin",
  async ({ username, password }, thunkAPI) => {
    // console.log(username, password);
    try {
      // api call
      const response = await axiosPrivate.post("/user/login/", {
        username,
        password,
      });

      if (!response.data.status) {
        thunkAPI.dispatch(notifyAuthUserErrorMessage(response.data.message));
      } else {
        thunkAPI.dispatch(notifyAuthUserSuccessMessage(response.data.message));
        // store user's info/token in local storage
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        thunkAPI.dispatch(
          notifyAuthUserErrorMessage(error.response.data.non_field_errors[0])
        );
      } else if (error.response.status === 401) {
        thunkAPI.dispatch(
          notifyAuthUserErrorMessage(error.response.data.messages[0])
        );
      } else {
        thunkAPI.dispatch(
          notifyAuthUserErrorMessage(error.response.data.messages[0])
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Handle POST request for user regitration
export const userRegister = createAsyncThunk(
  "authUser/userRegister",
  async (
    { first_name, last_name, username, email, password, confirm_password },
    thunkAPI
  ) => {
    // console.log(
    //   first_name,
    //   last_name,
    //   username,
    //   email,
    //   password,
    //   confirm_password
    // );
    try {
      // api call
      const response = await axiosPrivate.post("/user/register/", {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password,
      });

      //   console.log(response);

      if (response.data.status === 201) {
        //     thunkAPI.dispatch(notifyAuthUserErrorMessage(response.data.message));
        thunkAPI.dispatch(notifyAuthUserSuccessMessage(response.data.message));
      }

      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        notifyAuthUserErrorMessage(error.response.data.message)
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
    notifyAuthUserSuccessMessage: (state, action) => {
      state.message = action.payload;
      toast.success(action.payload);
    },
    notifyAuthUserErrorMessage: (state, action) => {
      state.message = action.payload;
      toast.error(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = payload;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

// destructure the slice properties
const { reducer, actions } = authUserSlice;

// exports action creators
export const {
  logout,
  notifyAuthUserSuccessMessage,
  notifyAuthUserErrorMessage,
} = actions;
export default reducer;
