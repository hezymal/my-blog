import { FC, ReactNode } from "react";
import styled from "styled-components";
import { pt } from "../lib/sizes";

interface TextBoxProps {
    children: ReactNode;
    noMargin: boolean;
}

interface TextBoxRootProps {
    $noMargin: boolean;
}

const TextBoxRoot = styled.div<TextBoxRootProps>`
    margin-top: ${pt(2)};
    line-height: ${pt(2.5)};

    h1 {
        line-height: ${pt(3.5)};
        font-size: 1.6em;
        font-weight: 500;
        margin: ${pt(2)} 0 0 0;
    }

    p {
        margin: ${pt(2)} 0 0 0;
    }

    ${(props) => {
        if (props.$noMargin) {
            return `
                margin-top: 0;

                :first-child {
                    margin-top: 0;
                }
            `;
        }
    }}
`;

export const TextBox: FC<TextBoxProps> = ({ children, noMargin }) => {
    return <TextBoxRoot $noMargin={noMargin}>{children}</TextBoxRoot>;
};
