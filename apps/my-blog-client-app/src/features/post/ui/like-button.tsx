import { FC } from "react";
import { Button } from "@client-app/shared/ui/button";
import { Icon } from "@client-app/shared/ui/icon";

interface LikeButtonProps {
    numberOfLikes: number;
    isLiked: boolean;
    onClick: () => void;
}

export const LikeButton: FC<LikeButtonProps> = ({
    numberOfLikes,
    isLiked,
    onClick,
}) => {
    return (
        <Button
            color={isLiked ? "danger" : "default"}
            size="sm"
            onClick={onClick}
        >
            <Icon type="favorite" /> {numberOfLikes}
        </Button>
    );
};
