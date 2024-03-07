import { FC, ReactNode } from "react";
import styled from "styled-components";
import { pt } from "../lib/sizes";

interface TextBoxProps {
    children: ReactNode;
}

const TextBoxRoot = styled.div`
    margin-top: ${pt(2)};
    line-height: ${pt(2.5)};

    &:first-child {
        margin-top: 0;
    }

    h1 {
        line-height: ${pt(3.5)};
        font-size: 1.6em;
        font-weight: 500;
        margin: ${pt(2)} 0 0 0;

        &:first-child {
            margin-top: 0;
        }
    }

    p {
        margin: ${pt(2)} 0 0 0;
    }
`;

export const TextBox: FC<TextBoxProps> = ({ children }) => {
    return <TextBoxRoot>{children}</TextBoxRoot>;
};
