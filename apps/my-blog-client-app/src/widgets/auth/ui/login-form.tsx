"use client";

import { useRouter } from "next/navigation";
import { FC, FormEventHandler, useState } from "react";
import { z } from "zod";
import { useAppDispatch } from "@/app/store";
import { loginUser } from "@/entities/auth/actions/auth";
import { fetchAuthUser } from "@/entities/auth/model/auth-slice";
import { Button, ButtonGroup } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Form, FormField } from "@/shared/ui/form";
import { RouteLink } from "@/shared/ui/link";
import { TextInput } from "@/shared/ui/text-input";
import { createValidator } from "@/shared/lib/validation";

const validate = createValidator(
    z.object({
        userName: z.string().min(5),
        password: z.string().min(5),
    })
);

export const LoginForm: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const validationResult = !isSubmitted
        ? null
        : validate({ userName, password });

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const validationResult = validate({ userName, password });
        if (!validationResult.success) {
            setIsSubmitted(true);
            return;
        }

        await loginUser({ userName, password });
        dispatch(fetchAuthUser());
        router.push("/blog");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Card>
                <CardHeader align="center">Log In</CardHeader>
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
                    <FormField
                        label="Password:"
                        errors={validationResult?.errors?.password?._errors}
                    >
                        <TextInput
                            autoComplete="current-password"
                            type="password"
                            value={password}
                            isValid={!validationResult?.errors?.password}
                            onChange={setPassword}
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
                        <ButtonGroup justify="end">
                            <RouteLink href="/register">Register</RouteLink>
                            <RouteLink href="/reset-password">
                                Reset Password
                            </RouteLink>
                        </ButtonGroup>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Form>
    );
};
