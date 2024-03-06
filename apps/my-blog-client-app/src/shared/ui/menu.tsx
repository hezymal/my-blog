import Link from "next/link";
import { FC, ReactNode } from "react";
import styled from "styled-components";
import { borders } from "../lib/borders";
import { colors } from "../lib/colors";
import { pt } from "../lib/sizes";

type MenuColor = "light" | "dark";

interface MenuProps {
    children: ReactNode;
}

interface MenuItemProps {
    children: ReactNode;
    href: string;
    color?: MenuColor;
    isActive?: boolean;
}

interface MenuItemLinkProps {
    $color: MenuColor;
    $isActive: boolean;
}

const MenuItemRoot = styled.li`
    margin: 4px 0;

    &:first-child {
        margin-top: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

const MenuItemLink = styled(Link)<MenuItemLinkProps>`
    border-radius: ${borders.radius.base};
    color: inherit;
    display: block;
    padding: ${pt(1)};
    text-decoration: none;

    ${(props) => {
        switch (props.$color) {
            case "dark":
                return `
                    &:hover {
                        background-color: ${colors.grey1};
                    }
                `;

            case "light":
                return `
                    &:hover {
                        background-color: ${colors.grey2};
                    }
                `;
        }
    }}

    ${(props) => {
        if (!props.$isActive) {
            return;
        }

        switch (props.$color) {
            case "dark":
                return `
                    background-color: ${colors.grey1};
                `;

            case "light":
                return `
                    background-color: ${colors.grey2};
                `;
        }
    }}
`;

const MenuRoot = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    user-select: none;
`;

export const Menu: FC<MenuProps> = ({ children }) => {
    return <MenuRoot>{children}</MenuRoot>;
};

export const MenuItem: FC<MenuItemProps> = ({
    children,
    color = "dark",
    href,
    isActive = false,
}) => {
    return (
        <MenuItemRoot>
            <MenuItemLink href={href} $color={color} $isActive={isActive}>
                {children}
            </MenuItemLink>
        </MenuItemRoot>
    );
};
