"use client";

import { FC, ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};
