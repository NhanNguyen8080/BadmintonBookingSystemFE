import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import centerSlice from '../slices/centerSlice';

const rootReducer = combineReducers({
    center: centerSlice,
    auth: authSlice
    // Add other reducers here
});

export default rootReducer;