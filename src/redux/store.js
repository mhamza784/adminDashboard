import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/index";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

const persistConfig = {
  key: "root",
  storage,
};
const middleware = [];

const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const enhancers = [...middleware];
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: enhancers,
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
