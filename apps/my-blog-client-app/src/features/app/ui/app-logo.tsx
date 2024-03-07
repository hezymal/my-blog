import { FC } from "react";
import styled from "styled-components";
import { pt } from "@client-app/shared/lib/sizes";

const AppLogoRoot = styled.a`
    color: inherit;
    font-size: 1.5em;
    font-weight: 900;
    margin: 0;
    line-height: ${pt(4)};
    text-decoration: none;
    text-transform: uppercase;
`;

export const AppLogo: FC = () => {
    return <AppLogoRoot href="/">My Blog</AppLogoRoot>;
};
