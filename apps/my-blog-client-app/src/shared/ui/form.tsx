import { FC, FormEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { pt } from "../lib/sizes";
import { colors } from "../lib/colors";

interface FormProps {
    children: ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

interface FormFieldProps {
    children: ReactNode;
    errors?: string[] | undefined;
    label: ReactNode;
}

export const Form: FC<FormProps> = ({ children, onSubmit }) => {
    return <form onSubmit={onSubmit}>{children}</form>;
};

const FormFieldRoot = styled.div`
    margin: ${pt(2)} 0;

    &:first-child {
        margin-top: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

const FormFieldLabel = styled.label`
    display: block;
    font-weight: 500;
`;

const FormFieldContent = styled.div`
    margin-top: ${pt(1)};
`;

const FormFieldErrors = styled.div`
    color: ${colors.red_F4};
    margin-top: ${pt(1)};
`;

export const FormField: FC<FormFieldProps> = ({ children, errors, label }) => {
    return (
        <FormFieldRoot>
            <FormFieldLabel>{label}</FormFieldLabel>
            <FormFieldContent>{children}</FormFieldContent>
            {errors && errors.length > 0 && (
                <FormFieldErrors>{errors[0]}</FormFieldErrors>
            )}
        </FormFieldRoot>
    );
};
