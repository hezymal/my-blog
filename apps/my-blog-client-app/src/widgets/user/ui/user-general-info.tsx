"use client";

import { FC, FormEventHandler, useState } from "react";
import { z } from "zod";
import { useAppDispatch } from "@/app/store";
import { changeAuthUser } from "@/entities/auth/actions/auth";
import { fetchAuthUser } from "@/entities/auth/model/auth-slice";
import { Button, ButtonGroup } from "@/shared/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Form, FormField } from "@/shared/ui/form";
import { TextInput } from "@/shared/ui/text-input";
import { createValidator } from "@/shared/lib/validation";

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
