import "./globals.css";
import "./material-symbols.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, ReactNode } from "react";
import { OverlayRootProvider } from "@client-app/shared/ui/overlay-root";
import { StoreProvider } from "./store-provider";
import { AuthorizationProvider } from "./authorization-provider";

interface RootLayoutProps {
    children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "my-blog",
    description: "my-blog",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StoreProvider>
                    <AuthorizationProvider>
                        <OverlayRootProvider>{children}</OverlayRootProvider>
                    </AuthorizationProvider>
                </StoreProvider>
            </body>
        </html>
    );
};

export default RootLayout;
