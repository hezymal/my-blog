"use client";

import { FC, ReactNode, useEffect } from "react";
import { fetchAuthUser } from "@/entities/auth/model/auth-slice";
import { useAppDispatch, useAppSelector } from "./store";

interface AuthorizationProviderProps {
    children: ReactNode;
}

export const AuthorizationProvider: FC<AuthorizationProviderProps> = ({
    children,
}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) {
            dispatch(fetchAuthUser());
        }
    }, [user, dispatch]);

    return children;
};
