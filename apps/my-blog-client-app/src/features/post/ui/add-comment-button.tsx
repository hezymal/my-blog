import { FC } from "react";
import { Button } from "@client-app/shared/ui/button";
import { Icon } from "@client-app/shared/ui/icon";

interface AddCommentButtonProps {
    numberOfComments: number;
    onClick: () => void;
}

export const AddCommentButton: FC<AddCommentButtonProps> = ({
    numberOfComments,
    onClick,
}) => {
    return (
        <Button size="sm" onClick={onClick}>
            <Icon type="mode_comment" /> {numberOfComments}
        </Button>
    );
};
