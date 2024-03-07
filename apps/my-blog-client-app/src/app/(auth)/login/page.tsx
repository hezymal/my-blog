"use client";

import { FC, Fragment } from "react";
import { NotificationEntries } from "@client-app/entities/notification/ui/notification-entries";
import { LoginForm } from "@client-app/widgets/auth/ui/login-form";

const LoginPage: FC = () => {
    return (
        <Fragment>
            <LoginForm />
            <NotificationEntries />
        </Fragment>
    );
};

export default LoginPage;
