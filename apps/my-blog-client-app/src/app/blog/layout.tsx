"use client";

import { FC, ReactNode } from "react";
import { Card } from "@client-app/shared/ui/card";
import { Container } from "@client-app/shared/ui/container";
import { Grid, GridCell } from "@client-app/shared/ui/grid";
import { AppHeader } from "@client-app/widgets/app/ui/app-header";
import { PostCategories } from "@client-app/widgets/post/ui/post-categories";
import { PostCreationModal } from "@client-app/widgets/post/ui/post-creation-modal";
import { AuthorizationProvider } from "../authorization-provider";

interface BlogLayoutProps {
    children: ReactNode;
}

const BlogLayout: FC<BlogLayoutProps> = ({ children }) => {
    return (
        <AuthorizationProvider>
            <AppHeader />
            <Container>
                <Grid gutter={2}>
                    <GridCell size={2} noFlex>
                        <Card background={false}>
                            <PostCategories />
                        </Card>
                        <Card>
                            <PostCreationModal />
                        </Card>
                    </GridCell>
                    <GridCell size={10} noFlex>
                        {children}
                    </GridCell>
                </Grid>
            </Container>
        </AuthorizationProvider>
    );
};

export default BlogLayout;
