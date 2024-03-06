import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import { Menu, MenuItem } from "@/shared/ui/menu";
import { Card } from "@/shared/ui/card";
import { RouteLink } from "@/shared/ui/link";

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
