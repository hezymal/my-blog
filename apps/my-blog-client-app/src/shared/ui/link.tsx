import NextLink from "next/link";
import { FC, ReactNode } from "react";
import styled from "styled-components";
import { borders } from "../lib/borders";
import { colors } from "../lib/colors";
import { pt } from "../lib/sizes";

interface RouteLinkProps {
    children: ReactNode;
    href: string;
}

const RouteLinkRoot = styled(NextLink)`
    background-color: ${colors.grey2};
    border: none;
    border-radius: ${borders.radius.base};
    cursor: pointer;
    color: ${colors.white};
    display: inline-block;
    font: inherit;
    height: ${pt(4)};
    line-height: ${pt(4)};
    padding: 0 ${pt(2)};
    transition: background-color 0.1s;
    text-decoration: none;

    &:hover {
        background-color: ${colors.grey_4};
    }
`;

export const RouteLink: FC<RouteLinkProps> = ({ children, href }) => {
    return <RouteLinkRoot href={href}>{children}</RouteLinkRoot>;
};
