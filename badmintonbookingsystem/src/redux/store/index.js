import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import authSlice from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice
    // ,
    // product: productSlice,
    // cart: cartSlice,
    // shipment: shipmentSlice
  },
});

export const persistor = persistStore(store);
