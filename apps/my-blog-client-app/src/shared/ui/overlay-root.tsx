"use client";

import {
    FC,
    ReactNode,
    RefObject,
    createContext,
    useContext,
    useRef,
} from "react";
import styled from "styled-components";

interface OverlayRootProviderProps {
    children: ReactNode;
}

const OverlayRootElement = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
`;

const OverlayRootContext = createContext<RefObject<HTMLDivElement> | null>(
    null
);

export const useOverlayRoot = () => {
    const context = useContext(OverlayRootContext);
    return context ? context.current : null;
};

export const OverlayRootProvider: FC<OverlayRootProviderProps> = ({
    children,
}) => {
    const rootElementRef = useRef<HTMLDivElement>(null);

    return (
        <OverlayRootContext.Provider value={rootElementRef}>
            {children}
            <OverlayRootElement ref={rootElementRef} />
        </OverlayRootContext.Provider>
    );
};
