import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Icon, IconType } from "./icon";
import { borders } from "../lib/borders";
import { colors } from "../lib/colors";
import { pt } from "../lib/sizes";

export type ButtonColor =
    | "danger"
    | "success"
    | "default"
    | "primary"
    | "light-danger"
    | "light-success"
    | "light-default"
    | "light-primary";

type ButtonType = "button" | "submit";

type ButtonWidth = "auto" | "stretch";

type ButtonSize = "sm" | "md";

type ButtonGroupJustify = "start" | "space-between" | "end";

interface ButtonProps {
    children: ReactNode;
    color?: ButtonColor;
    disabled?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
    width?: ButtonWidth;
    onClick?: () => void;
}

interface IconButtonProps {
    iconType: IconType;
    color?: ButtonColor;
    disabled?: boolean;
    type?: ButtonType;
    onClick?: () => void;
}

interface ButtonRootProps {
    type: ButtonType;
    $color: ButtonColor;
    $size: ButtonSize;
    $width: ButtonWidth;
}

interface IconButtonRootProps {
    type: ButtonType;
    $color: ButtonColor;
}

interface ButtonGroupProps {
    children: ReactNode;
    justify?: ButtonGroupJustify;
}

interface ButtonGroupRootProps {
    $justify: ButtonGroupJustify;
}

const buttonBaseMixin = () => `
    border: none;
    color: ${colors.white};
    cursor: pointer;
    font: inherit;
    font-weight: 500;
    height: ${pt(4)};
    user-select: none;
    transition: background-color 0.1s;

    &:disabled {
        background-color: ${colors.grey2};
        color: ${colors.grey7};
        cursor: default;
    }
`;

const ButtonRoot = styled.button<ButtonRootProps>`
    ${buttonBaseMixin()}

    border-radius: ${borders.radius.base};
    width: ${(props) => (props.$width === "stretch" ? "100%" : "auto")};

    ${(props) => {
        switch (props.$size) {
            case "sm":
                return `
                    padding: 0 ${pt(1)};
                `;

            case "md":
                return `
                    padding: 0 ${pt(2)};
                `;
        }
    }}

    ${(props) => {
        switch (props.$color) {
            case "danger":
                return `
                    background-color: ${colors.red_F4};
    
                    &:hover {
                        background-color: ${colors.red_F6};
                    }
                `;

            case "primary":
                return `
                    background-color: ${colors.blue0};
    
                    &:hover {
                        background-color: ${colors.blue1};
                    }
                `;

            case "default":
                return `
                    background-color: ${colors.grey2};
            
                    &:hover {
                        background-color: ${colors.grey_4};
                    }
                `;
        }
    }}
`;

const IconButtonRoot = styled.button<IconButtonRootProps>`
    ${buttonBaseMixin()}

    align-items: center;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0;
    width: ${pt(4)};

    ${(props) => {
        switch (props.$color) {
            case "danger":
                return `
                    &:hover {
                        background-color: ${colors.red_F6};
                    }
                `;

            case "success":
                return `
                    &:hover {
                        background-color: ${colors.green_9};
                    }
                `;

            case "primary":
                return `
                    &:hover {
                        background-color: ${colors.blue1};
                    }
                `;

            case "default":
                return `
                    &:hover {
                        background-color: ${colors.grey_4};
                    }
                `;

            case "light-danger":
                return `
                    &:hover {
                        background-color: ${colors.red_F8};
                    }
                `;

            case "light-success":
                return `
                    &:hover {
                        background-color: ${colors.green_B};
                    }
                `;

            case "light-primary":
                return `
                    &:hover {
                        background-color: ${colors.blue_8};
                    }
                `;

            case "light-default":
                return `
                    &:hover {
                        background-color: ${colors.grey7};
                    }
                `;
        }
    }}
`;

const ButtonGroupRoot = styled.div<ButtonGroupRootProps>`
    display: flex;
    flex-grow: 1;
    gap: ${pt(1)};
    justify-content: ${(props) => {
        switch (props.$justify) {
            case "start":
                return "flex-start";

            case "space-between":
                return "space-between";

            case "end":
                return "flex-end";
        }
    }};
`;

const ButtonDelimeterRoot = styled.hr`
    border: none;
    border-left: 1px solid ${colors.grey_4};
    margin: 0;
    width: 1px;
`;

export const Button: FC<ButtonProps> = ({
    children,
    color = "default",
    disabled = false,
    size = "md",
    type = "button",
    width = "auto",
    onClick,
}) => {
    return (
        <ButtonRoot
            disabled={disabled}
            type={type}
            $color={color}
            $width={width}
            $size={size}
            onClick={onClick}
        >
            {children}
        </ButtonRoot>
    );
};

export const IconButton: FC<IconButtonProps> = ({
    iconType,
    color = "default",
    disabled = false,
    type = "button",
    onClick,
}) => {
    return (
        <IconButtonRoot
            disabled={disabled}
            type={type}
            $color={color}
            onClick={onClick}
        >
            <Icon type={iconType} />
        </IconButtonRoot>
    );
};

export const ButtonGroup: FC<ButtonGroupProps> = ({
    children,
    justify = "start",
}) => {
    return <ButtonGroupRoot $justify={justify}>{children}</ButtonGroupRoot>;
};

export const ButtonDelimeter: FC = () => {
    return <ButtonDelimeterRoot />;
};
