"use client";

import { FC } from "react";
import styled from "styled-components";
import { AppLogo } from "@/features/app/ui/app-logo";
import { Container } from "@/shared/ui/container";
import { Grid, GridCell } from "@/shared/ui/grid";
import { colors } from "@/shared/lib/colors";
import { pt } from "@/shared/lib/sizes";
import { UserBar } from "@/widgets/user/ui/user-bar";

const AppHeaderRoot = styled.div`
    background-color: ${colors.grey01};
    padding: ${pt(1)} 0;
`;

export const AppHeader: FC = () => {
    return (
        <AppHeaderRoot>
            <Container>
                <Grid>
                    <GridCell size={6}>
                        <AppLogo />
                    </GridCell>
                    <GridCell align="right" size={6}>
                        <UserBar />
                    </GridCell>
                </Grid>
            </Container>
        </AppHeaderRoot>
    );
};
