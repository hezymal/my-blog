"use client";

import { FC, MouseEventHandler, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { colors } from "../lib/colors";
import { pt } from "../lib/sizes";
import { useOverlayRoot } from "./overlay-root";

interface ModalProps {
    children: ReactNode;
    show: boolean;
    onClose: () => void;
}

const ModalOverlay = styled.div`
    background-color: ${colors.grey02};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const ModalDialog = styled.div`
    left: calc(50% - ${pt(35)});
    top: ${pt(4)};
    padding: ${pt(2)};
    position: absolute;
    width: ${pt(70)};
`;

export const Modal: FC<ModalProps> = ({ children, show, onClose }) => {
    const overlayRoot = useOverlayRoot();

    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
    }, [show]);

    if (!show || !overlayRoot) {
        return null;
    }

    const onOverlayClick = () => {
        onClose();
    };

    const onDialogClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
    };

    return createPortal(
        <ModalOverlay onClick={onOverlayClick}>
            <ModalDialog onClick={onDialogClick}>{children}</ModalDialog>
        </ModalOverlay>,
        overlayRoot
    );
};
