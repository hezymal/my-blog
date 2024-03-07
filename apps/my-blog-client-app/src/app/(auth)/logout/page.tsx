"use client";

import { redirect } from "next/navigation";
import { FC } from "react";
import { useAppDispatch } from "@client-app/app/store";
import { removeUser } from "@client-app/entities/auth/model/auth-slice";

const Page: FC = () => {
    const dispatch = useAppDispatch();

    dispatch(removeUser());
    redirect("/login");
};

export default Page;
