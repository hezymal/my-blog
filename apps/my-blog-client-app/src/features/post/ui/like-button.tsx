import { FC } from "react";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";

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
