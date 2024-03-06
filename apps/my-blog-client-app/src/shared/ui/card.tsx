import { FC, ReactNode } from "react";
import styled from "styled-components";
import { borders } from "../lib/borders";
import { colors } from "../lib/colors";
import { pt } from "../lib/sizes";

type CardAlign = "left" | "center";

interface CardProps {
    children: ReactNode;
    background?: boolean;
    bordered?: boolean;
    margin?: boolean;
}

interface CardRootProps {
    $background: boolean;
    $bordered: boolean;
    $margin?: boolean;
}

interface CardHeaderProps {
    children: ReactNode;
    align?: CardAlign;
}

interface CardHeaderRootProps {
    $align: CardAlign;
}

interface CardContentProps {
    children: ReactNode;
}

interface CardFooterProps {
    children: ReactNode;
}

const borderMixin = (position: "top" | "bottom") => `
    &:after {
        content: "";
        border-top: 1px solid ${colors.grey2};
        height: 1px;
        position: absolute;
        left: ${pt(2)};
        width: calc(100% - ${pt(4)});

        ${position === "top" ? "top: 0;" : "bottom: 0;"}
    }
`;

const CardRoot = styled.div<CardRootProps>`
    border-radius: ${borders.radius.base};

    ${(props) => {
        if (props.$background) {
            return `
                background-color: ${colors.grey1};
            `;
        }
    }}

    ${(props) => {
        if (props.$bordered) {
            return `
                border: 1px solid ${colors.grey2};
            `;
        }
    }}

    ${(props) => {
        if (props.$margin) {
            return `
                margin: ${pt(2)} 0;
            `;
        }
    }}
`;

const CardHeaderRoot = styled.header<CardHeaderRootProps>`
    padding: ${pt(2)};
    position: relative;
    text-align: ${(props) => props.$align};

    ${borderMixin("bottom")}
`;

const CardContentRoot = styled.div`
    padding: ${pt(2)};
`;

const CardFooterRoot = styled.footer`
    padding: ${pt(2)};
    position: relative;

    ${borderMixin("top")}
`;

export const Card: FC<CardProps> = ({
    children,
    background = true,
    bordered = false,
    margin = true,
}) => {
    return (
        <CardRoot
            $background={background}
            $bordered={bordered}
            $margin={margin}
        >
            {children}
        </CardRoot>
    );
};

export const CardHeader: FC<CardHeaderProps> = ({
    children,
    align = "left",
}) => {
    return <CardHeaderRoot $align={align}>{children}</CardHeaderRoot>;
};

export const CardContent: FC<CardContentProps> = ({ children }) => {
    return <CardContentRoot>{children}</CardContentRoot>;
};

export const CardFooter: FC<CardFooterProps> = ({ children }) => {
    return <CardFooterRoot>{children}</CardFooterRoot>;
};
