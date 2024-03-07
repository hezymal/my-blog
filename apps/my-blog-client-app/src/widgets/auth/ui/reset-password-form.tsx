"use client";

import { useRouter } from "next/navigation";
import { FC, FormEventHandler, useState } from "react";
import { z } from "zod";
import { useAppDispatch } from "@client-app/app/store";
import { addNotificationEntry } from "@client-app/entities/notification/model/notification-slice";
import { Button, ButtonGroup } from "@client-app/shared/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@client-app/shared/ui/card";
import { Form, FormField } from "@client-app/shared/ui/form";
import { RouteLink } from "@client-app/shared/ui/link";
import { TextInput } from "@client-app/shared/ui/text-input";
import { createValidator } from "@client-app/shared/lib/validation";

const validate = createValidator(
    z.object({
        email: z.string().email(),
    })
);

const ResetPasswordForm: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    const validationResult = !isSubmitted ? null : validate({ email });

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const validationResult = validate({ email });
        if (!validationResult?.success) {
            setIsSubmitted(true);
            return;
        }

        dispatch(
            addNotificationEntry({
                type: "success",
                message: "We are sent mail for reset your password",
            })
        );
        router.push("/login");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Card>
                <CardHeader align="center">Reset Password</CardHeader>
                <CardContent>
                    <FormField
                        label="E-mail:"
                        errors={validationResult?.errors?.email?._errors}
                    >
                        <TextInput
                            autoComplete="email"
                            type="email"
                            isValid={!validationResult?.errors?.email}
                            value={email}
                            onChange={setEmail}
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

export default ResetPasswordForm;
