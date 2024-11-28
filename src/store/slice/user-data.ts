/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getData from "@/api/getData.api";

type UserData = {
  userId: number;
  userName: string;
  email: string;
  userType: {
    id: number;
    name: string;
  };
};

interface MenuRouteState {
  userData: UserData;
}

const initialState: MenuRouteState = {
  userData: {
    userId: 0,
    userName: "",
    email: "",
    userType: {
      id: 0,
      name: "",
    },
  },
};

export const fetchUserData = createAsyncThunk(
  "fetchUserData",
  async (): Promise<any> => {
    const user = await getData("/users/me/data");
    return user.data;
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      return state;
    });
  },
});

export default userDataSlice.reducer;
