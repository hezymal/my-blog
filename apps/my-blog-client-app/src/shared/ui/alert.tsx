import { FC, ReactNode } from "react";
import styled from "styled-components";
import { borders } from "../lib/borders";
import { colors } from "../lib/colors";
import { pt } from "../lib/sizes";

type AlertAlign = "left" | "center" | "right";

type AlertType = "success" | "info" | "error";

interface AlertProps {
    children: ReactNode;
    align?: AlertAlign;
    type?: AlertType;
}

interface AlertRootProps {
    $align: AlertAlign;
    $type: AlertType;
}

const AlertRoot = styled.div<AlertRootProps>`
    border-radius: ${borders.radius.base};
    padding: ${pt(2)};
    text-align: ${(props) => props.$align};
    line-height: ${pt(3)};

    ${(props) => {
        switch (props.$type) {
            case "success":
                return `
                    background-color: ${colors.green_9};
                `;

            case "info":
                return `
                    background-color: ${colors.grey1};
                `;

            case "error":
                return `
                    background-color: ${colors.red_E2};
                `;
        }
    }}
`;

export const Alert: FC<AlertProps> = ({
    children,
    align = "center",
    type = "info",
}) => {
    return (
        <AlertRoot $align={align} $type={type}>
            {children}
        </AlertRoot>
    );
};
