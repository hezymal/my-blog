"use client";

import { redirect } from "next/navigation";
import { FC } from "react";
import { useAppDispatch } from "@/app/store";
import { removeUser } from "@/entities/auth/model/auth-slice";

const Page: FC = () => {
    const dispatch = useAppDispatch();

    dispatch(removeUser());
    redirect("/login");
};

export default Page;
