import { FC } from "react";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";

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
