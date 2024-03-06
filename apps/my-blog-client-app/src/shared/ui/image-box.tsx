import { FC } from "react";
import styled from "styled-components";
import { borders } from "../lib/borders";
import { pt } from "../lib/sizes";

interface ImageBoxProps {
    url: string;
}

const ImageBoxRoot = styled.img`
    border-radius: ${borders.radius.base};
    display: block;
    width: 100%;
    margin-top: ${pt(2)};
`;

export const ImageBox: FC<ImageBoxProps> = ({ url }) => {
    return <ImageBoxRoot src={url} />;
};
