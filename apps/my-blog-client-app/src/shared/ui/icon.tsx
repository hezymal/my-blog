import { FC } from "react";
import styled from "styled-components";

export type IconType = "favorite" | "mode_comment" | "cancel" | "close";

interface IconProps {
    type: IconType;
}

const IconRoot = styled.span`
    vertical-align: middle;
`;

export const Icon: FC<IconProps> = ({ type }) => {
    return <IconRoot className="material-symbols-outlined">{type}</IconRoot>;
};
