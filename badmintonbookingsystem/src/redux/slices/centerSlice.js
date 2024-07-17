// src/redux/slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
// import { getProductFilterBy } from "../../api/apiProduct";

const centerPersistConfig = {
  key: "center",
  storage,
};

const initialState = {
  centers: [],
  total: 0,
};

const centerSlice = createSlice({
  name: "center",
  initialState,
  reducers: {
    setCenters: (state, action) => {
      const { centers } = action.payload.data;
      state.centers = centers;
    },
  },
});

export const { setCenters } = centerSlice.actions;

// export const fetchFilteredProducts = (params) => async (dispatch) => {
//   try {
//     const response = await getProductFilterBy(params);
//     dispatch(setProducts({ data: response.data.data.$values }));
//   } catch (error) {
//     console.error('Error fetching filtered products:', error);
//     // Handle error, e.g., dispatch an error action
//   }
// };

export const selectCenters = (state) => state.centers;

export default persistReducer(centerPersistConfig, centerSlice.reducer);
