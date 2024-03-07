"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useAppDispatch } from "@client-app/app/store";
import { setUser } from "@client-app/entities/auth/model/auth-slice";
import { logoutUser } from "@client-app/entities/auth/actions/auth";

const Page: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unauthorize = async () => {
            await logoutUser();
            dispatch(setUser(null));
            router.push("/login");
        };

        unauthorize();
    }, [router, dispatch]);

    return null;
};

export default Page;
