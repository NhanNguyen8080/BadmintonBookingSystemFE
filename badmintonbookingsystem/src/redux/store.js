import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers/index';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['center', 'auth'], // Persist only specific reducers if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check if necessary
        }),
});

const persistor = persistStore(store);

export { store, persistor };