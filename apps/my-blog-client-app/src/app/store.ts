import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
    useStore,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@client-app/entities/auth/model/auth-slice";
import { notificationSlice } from "@client-app/entities/notification/model/notification-slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [notificationSlice.name]: notificationSlice.reducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppStore: () => AppStore = useStore;
