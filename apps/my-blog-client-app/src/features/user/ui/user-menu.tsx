import { FC } from "react";
import styled from "styled-components";
import { Card, CardContent, CardFooter, CardHeader } from "@client-app/shared/ui/card";
import { Menu, MenuItem } from "@client-app/shared/ui/menu";
import { pt } from "@client-app/shared/lib/sizes";

interface UserMenuProps {
    userName: string;
}

const UserMenuRoot = styled.div`
    width: ${pt(25)};
`;

export const UserMenu: FC<UserMenuProps> = ({ userName }) => {
    return (
        <UserMenuRoot>
            <Card bordered margin={false}>
                <CardHeader align="center">{userName}</CardHeader>
                <CardContent>
                    <Menu>
                        <MenuItem href="/profile" color="light">
                            Profile
                        </MenuItem>
                    </Menu>
                </CardContent>
                <CardFooter>
                    <Menu>
                        <MenuItem href="/logout" color="light">
                            Logout
                        </MenuItem>
                    </Menu>
                </CardFooter>
            </Card>
        </UserMenuRoot>
    );
};
