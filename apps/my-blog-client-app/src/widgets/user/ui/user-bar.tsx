import { FC } from "react";
import { useAppSelector } from "@client-app/app/store";
import { UserIcon } from "@client-app/features/user/ui/user-icon";
import { UserMenu } from "@client-app/features/user/ui/user-menu";
import { Dropdown } from "@client-app/shared/ui/dropdown";

interface UserBarProps {}

export const UserBar: FC<UserBarProps> = () => {
    const user = useAppSelector((state) => state.auth.user);
    if (!user) {
        return null;
    }

    return (
        <Dropdown
            direction="right"
            toggle={<UserIcon userName={user.userName} />}
            menu={<UserMenu userName={user.userName} />}
        />
    );
};
