import { FC } from "react";
import { Button } from "@client-app/shared/ui/button";

interface CreatePostButtonProps {
    onClick: () => void;
}

export const CreatePostButton: FC<CreatePostButtonProps> = ({ onClick }) => {
    return (
        <Button color="primary" type="button" width="stretch" onClick={onClick}>
            Create Post
        </Button>
    );
};
