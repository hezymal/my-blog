"use client";

import {
    FC,
    Fragment,
    MouseEventHandler,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOverlayRoot } from "./overlay-root";
import { Vector2 } from "../lib/vector2";
import { pt } from "../lib/sizes";

type DropdownDirection = "left" | "right";

interface DropdownProps {
    toggle: ReactNode;
    menu: ReactNode;
    direction?: DropdownDirection;
}

interface DropdownMenuProps {
    $direction: DropdownDirection;
    $position: Vector2;
}

const DropdownToggle = styled.div`
    cursor: pointer;
    display: inline-block;
`;

const DropdownMenu = styled.div<DropdownMenuProps>`
    position: absolute;

    ${({ $position }) => {
        return `top: ${pt(2, $position.y)};`;
    }}

    ${({ $direction, $position }) => {
        return $direction === "left"
            ? `left: ${$position.x}px;`
            : `right: ${$position.x}px;`;
    }}
`;

const getMenuPosition = (
    toggleElement: HTMLDivElement | null,
    direction: DropdownDirection
) => {
    const position: Vector2 = { x: 0, y: 0 };

    if (toggleElement) {
        const toggleRect = toggleElement.getBoundingClientRect();

        if (direction === "left") {
            position.x = toggleRect.left;
        } else {
            position.x = document.body.offsetWidth - toggleRect.right;
        }

        position.y = toggleRect.top + toggleElement.clientHeight;
    }

    return position;
};

export const Dropdown: FC<DropdownProps> = ({
    toggle,
    menu,
    direction = "left",
}) => {
    const overlayRoot = useOverlayRoot();
    const [show, setShow] = useState(false);
    const toggleElementRef = useRef<HTMLDivElement>(null);
    const menuElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = () => {
            setShow(false);
        };

        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const renderToggle = () => {
        const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
            event.nativeEvent.stopImmediatePropagation();
            setShow(true);
        };

        return (
            <DropdownToggle ref={toggleElementRef} onClick={handleClick}>
                {toggle}
            </DropdownToggle>
        );
    };

    const renderMenu = () => {
        if (!show || !overlayRoot) {
            return null;
        }

        const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
            event.stopPropagation();
        };

        return createPortal(
            <DropdownMenu
                ref={menuElementRef}
                $direction={direction}
                $position={getMenuPosition(toggleElementRef.current, direction)}
                onClick={handleClick}
            >
                {menu}
            </DropdownMenu>,
            overlayRoot
        );
    };

    return (
        <Fragment>
            {renderToggle()}
            {renderMenu()}
        </Fragment>
    );
};
