"use client";

import { useRouter } from "next/navigation";
import { FC, FormEventHandler, useState } from "react";
import { z } from "zod";
import { registerUser } from "@client-app/entities/auth/api/auth";
import { Button, ButtonGroup } from "@client-app/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@client-app/shared/ui/card";
import { Form, FormField } from "@client-app/shared/ui/form";
import { RouteLink } from "@client-app/shared/ui/link";
import { TextInput } from "@client-app/shared/ui/text-input";
import { createValidator } from "@client-app/shared/lib/validation";
import { useAppDispatch } from "@client-app/app/store";
import { addNotificationEntry } from "@client-app/entities/notification/model/notification-slice";

const validate = createValidator(
    z
        .object({
            userName: z.string().min(5),
            password: z.string().min(5),
            passwordRepeat: z.string().min(5),
        })
        .refine((data) => data.password === data.passwordRepeat, {
            message: "Passwords don't match",
            path: ["passwordRepeat"],
        })
);

export const RegisterForm: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const validationResult = !isSubmitted
        ? null
        : validate({
              userName,
              password,
              passwordRepeat,
          });

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const validationResult = validate({
            userName,
            password,
            passwordRepeat,
        });
        if (!validationResult?.success) {
            setIsSubmitted(true);
            return;
        }

        await registerUser({ userName, password });
        dispatch(
            addNotificationEntry({
                type: "success",
                message: "Conglaturation, your are registered!",
            })
        );
        router.push("/login");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Card>
                <CardHeader align="center">Register</CardHeader>
                <CardContent>
                    <FormField
                        label="User Name:"
                        errors={validationResult?.errors?.userName?._errors}
                    >
                        <TextInput
                            autoComplete="username"
                            isValid={!validationResult?.errors?.userName}
                            value={userName}
                            onChange={setUserName}
                        />
                    </FormField>
                    <FormField label="Password:">
                        <TextInput
                            autoComplete="new-password"
                            isValid={!validationResult?.errors?.password}
                            type="password"
                            value={password}
                            onChange={setPassword}
                        />
                    </FormField>
                    <FormField label="Repeat Password:">
                        <TextInput
                            autoComplete="new-password"
                            isValid={!validationResult?.errors?.passwordRepeat}
                            type="password"
                            value={passwordRepeat}
                            onChange={setPasswordRepeat}
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
                            Submit
                        </Button>
                        <RouteLink href="/login">Back</RouteLink>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Form>
    );
};
