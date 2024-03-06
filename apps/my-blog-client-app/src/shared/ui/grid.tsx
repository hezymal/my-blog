import { FC, ReactNode } from "react";
import styled from "styled-components";
import { pt } from "../lib/sizes";

interface GridProps {
    children: ReactNode;
    gutter?: number;
}

interface GridRootProps {
    $gutter: number;
}

type GridCellAlign = "left" | "right";

type GridCellVAlign = "top" | "middle" | "bottom";

interface GridCellProps {
    children: ReactNode;
    size: number;
    align?: GridCellAlign;
    valign?: GridCellVAlign;
    noFlex?: boolean;
}

interface GridCellRootProps {
    $align: GridCellAlign;
    $valign: GridCellVAlign;
    $noFlex: boolean;
    $size: number;
}

const GridRoot = styled.div<GridRootProps>`
    display: flex;
    gap: ${(props) => pt(props.$gutter)};
`;

const GridCellRoot = styled.div<GridCellRootProps>`
    display: ${(props) => (props.$noFlex ? "block" : "flex")};
    width: ${(props) => (100 * props.$size) / 12}%;
    align-items: ${(props) => {
        switch (props.$valign) {
            case "top":
                return "flex-start";

            case "middle":
                return "center";

            case "bottom":
                return "flex-end";
        }
    }};
    justify-content: ${(props) => {
        switch (props.$align) {
            case "left":
                return "flex-start";

            case "right":
                return "flex-end";
        }
    }};
`;

export const Grid: FC<GridProps> = ({ children, gutter = 0 }) => {
    return <GridRoot $gutter={gutter}>{children}</GridRoot>;
};

export const GridCell: FC<GridCellProps> = ({
    align = "left",
    valign = "top",
    children,
    noFlex = false,
    size,
}) => {
    return (
        <GridCellRoot
            $align={align}
            $noFlex={noFlex}
            $size={size}
            $valign={valign}
        >
            {children}
        </GridCellRoot>
    );
};
