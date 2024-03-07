"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, use, useEffect } from "react";
import { getAuthUser } from "@client-app/entities/auth/actions/auth";
import { setUser } from "@client-app/entities/auth/model/auth-slice";
import { useAppDispatch, useAppSelector } from "./store";

interface AuthorizationProviderProps {
    children: ReactNode;
}

export const useIsAuth = () => {
    const user = useAppSelector((state) => state.auth.user);
    return !!user;
};

export const AuthorizationProvider: FC<AuthorizationProviderProps> = ({
    children,
}) => {
    const isAuth = useIsAuth();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isAuth) {
            return;
        }

        const authorize = async () => {
            const result = await getAuthUser();
            if (!result.ok) {
                router.push("/login");
                return;
            }

            dispatch(setUser(result.payload));
            if (pathname === "/login") {
                router.push("/");
            }
        };

        authorize();
    }, [isAuth, pathname, router, dispatch]);

    return children;
};
