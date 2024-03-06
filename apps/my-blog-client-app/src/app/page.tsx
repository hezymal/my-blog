import { redirect } from "next/navigation";
import { FC } from "react";

const RootPage: FC = () => {
    redirect("/blog");
};

export default RootPage;
