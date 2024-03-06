import { FC, ReactNode } from "react";
import styled from "styled-components";
import { pt } from "../lib/sizes";

interface ContainerProps {
    children: ReactNode;
}

const ContainerRoot = styled.div`
    margin: 0 auto;
    width: ${pt(110)};
`;

export const Container: FC<ContainerProps> = ({ children }) => {
    return <ContainerRoot>{children}</ContainerRoot>;
};
