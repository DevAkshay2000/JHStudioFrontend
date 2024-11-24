import { configureStore } from "@reduxjs/toolkit";
import menuRoutes from "./slice/menu";

const store = configureStore({
  reducer: {
    headerMenu: menuRoutes,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
