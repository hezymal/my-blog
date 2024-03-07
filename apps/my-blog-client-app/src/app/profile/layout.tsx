"use client";

import { FC, ReactNode } from "react";
import { Container } from "@client-app/shared/ui/container";
import { Grid, GridCell } from "@client-app/shared/ui/grid";
import { AppHeader } from "@client-app/widgets/app/ui/app-header";
import { UserProfileMenu } from "@client-app/widgets/user/ui/user-profile-menu";
import { AuthorizationProvider } from "../authorization-provider";

interface ProfileLayoutProps {
    children: ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
    return (
        <AuthorizationProvider>
            <AppHeader />
            <Container>
                <Grid gutter={2}>
                    <GridCell size={3} noFlex>
                        <UserProfileMenu />
                    </GridCell>
                    <GridCell size={9} noFlex>
                        {children}
                    </GridCell>
                </Grid>
            </Container>
        </AuthorizationProvider>
    );
};

export default ProfileLayout;
