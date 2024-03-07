import { FC } from "react";
import { Alert } from "@client-app/shared/ui/alert";
import { Card } from "@client-app/shared/ui/card";

export const PostNotFound: FC = () => {
    return (
        <Card>
            <Alert>Not Found</Alert>
        </Card>
    );
};
