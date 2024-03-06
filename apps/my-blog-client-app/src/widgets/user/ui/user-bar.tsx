import { FC } from "react";
import { useAppSelector } from "@/app/store";
import { UserIcon } from "@/features/user/ui/user-icon";
import { UserMenu } from "@/features/user/ui/user-menu";
import { Dropdown } from "@/shared/ui/dropdown";

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
