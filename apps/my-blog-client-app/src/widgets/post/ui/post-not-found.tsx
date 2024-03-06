import { FC } from "react";
import { Alert } from "@/shared/ui/alert";
import { Card } from "@/shared/ui/card";

export const PostNotFound: FC = () => {
    return (
        <Card>
            <Alert>Not Found</Alert>
        </Card>
    );
};
