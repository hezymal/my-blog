import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import { Menu, MenuItem } from "@client-app/shared/ui/menu";
import { Card } from "@client-app/shared/ui/card";
import { RouteLink } from "@client-app/shared/ui/link";

export const UserProfileMenu: FC = () => {
    const pathname = usePathname();

    return (
        <Fragment>
            <Card background={false}>
                <Menu>
                    <MenuItem
                        href="/profile"
                        isActive={pathname === "/profile"}
                    >
                        General
                    </MenuItem>
                </Menu>
            </Card>
            <Card background={false}>
                <RouteLink href="/blog">Back to Blog</RouteLink>
            </Card>
        </Fragment>
    );
};
