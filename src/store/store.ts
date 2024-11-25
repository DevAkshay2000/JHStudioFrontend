import { configureStore } from "@reduxjs/toolkit";
import menuRoutes from "./slice/menu";
import userData from "./slice/user-data";
const store = configureStore({
  reducer: {
    headerMenu: menuRoutes,
    userData: userData,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
