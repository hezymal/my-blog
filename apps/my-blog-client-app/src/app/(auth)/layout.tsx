"use client";

import { FC, ReactNode } from "react";
import styled from "styled-components";
import { AppLogo } from "@client-app/features/app/ui/app-logo";
import { pt } from "@client-app/shared/lib/sizes";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayoutGrid = styled.div`
    display: grid;
    grid-template-areas:
        "left head right"
        "left form right"
        "foot foot foot";
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr ${pt(50)} 1fr;
    height: 100vh;
`;

const AuthLayoutHead = styled.div`
    grid-area: head;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
`;

const AuthLayoutForm = styled.div`
    grid-area: form;
`;

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <AuthLayoutGrid>
            <AuthLayoutHead>
                <AppLogo />
            </AuthLayoutHead>
            <AuthLayoutForm>{children}</AuthLayoutForm>
        </AuthLayoutGrid>
    );
};

export default AuthLayout;
