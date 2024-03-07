import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { borders } from "../lib/borders";
import { pt } from "../lib/sizes";
import { colors } from "../lib/colors";

interface ImageBoxProps {
    url: string;
}

interface BackgroundProps {
    $url: string;
}

interface AspectRatioProps {
    $aspectRation: number;
}

const ImageBoxRoot = styled.div`
    align-items: center;
    background-color: ${colors.grey02};
    border-radius: ${borders.radius.base};
    display: flex;
    justify-content: center;
    margin-top: ${pt(2)};
    position: relative;
    overflow: hidden;
`;

const Background = styled.div<BackgroundProps>`
    background-image: url(${(props) => props.$url});
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(25px) brightness(0.4);
`;

const AspectRatio = styled.div<AspectRatioProps>`
    aspect-ratio: ${(props) => props.$aspectRation};
    max-height: ${pt(50)};
    position: relative;
`;

const Image = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;

const loadImage = (element: HTMLImageElement) => {
    return new Promise<HTMLImageElement>((resolve) => {
        if (element.complete) {
            resolve(element);
            return;
        }

        element.onload = () => {
            resolve(element);
        };
    });
};

export const ImageBox: FC<ImageBoxProps> = ({ url }) => {
    const [aspectRation, setAspectRatio] = useState(0);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const image = imageRef.current;
        if (!image) {
            return;
        }

        const load = async () => {
            await loadImage(image);
            setAspectRatio(image.width / image.height);
        };

        load();
    }, []);

    return (
        <ImageBoxRoot>
            <Background $url={url} />
            <AspectRatio $aspectRation={aspectRation}>
                <Image ref={imageRef} src={url} />
            </AspectRatio>
        </ImageBoxRoot>
    );
};
