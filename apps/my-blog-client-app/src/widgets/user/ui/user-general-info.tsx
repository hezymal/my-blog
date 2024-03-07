"use client";

import { FC, FormEventHandler, useState } from "react";
import { z } from "zod";
import { useAppDispatch } from "@client-app/app/store";
import { changeAuthUser } from "@client-app/entities/auth/actions/auth";
import { fetchAuthUser } from "@client-app/entities/auth/model/auth-slice";
import { Button, ButtonGroup } from "@client-app/shared/ui/button";
import { Card, CardContent, CardFooter } from "@client-app/shared/ui/card";
import { Form, FormField } from "@client-app/shared/ui/form";
import { TextInput } from "@client-app/shared/ui/text-input";
import { createValidator } from "@client-app/shared/lib/validation";

const validate = createValidator(
    z.object({
        userName: z.string().min(5),
    })
);

export const UserGeneralInfo: FC = () => {
    const dispatch = useAppDispatch();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userName, setUserName] = useState("");

    const validationResult = !isSubmitted ? null : validate({ userName });

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const validationResult = validate({ userName });
        if (!validationResult.success) {
            setIsSubmitted(true);
            return;
        }

        await changeAuthUser({ userName });
        dispatch(fetchAuthUser());
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Card>
                <CardContent>
                    <FormField
                        label="User Name:"
                        errors={validationResult?.errors?.userName?._errors}
                    >
                        <TextInput
                            autoComplete="username"
                            value={userName}
                            isValid={!validationResult?.errors?.userName}
                            onChange={setUserName}
                        />
                    </FormField>
                </CardContent>
                <CardFooter>
                    <ButtonGroup justify="space-between">
                        <Button
                            color="primary"
                            disabled={validationResult?.success === false}
                            type="submit"
                        >
                            Save
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Form>
    );
};
