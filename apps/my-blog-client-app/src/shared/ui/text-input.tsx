import { FC } from "react";
import styled from "styled-components";
import { borders } from "../lib/borders";
import { colors } from "../lib/colors";
import { pt } from "../lib/sizes";

interface TextInputProps {
    value: string;
    autoComplete?: string;
    isValid?: boolean;
    type?: "email" | "text" | "password";
    onChange: (value: string) => void;
}

interface TextInputRootProps {
    $isValid?: boolean;
}

const TextInputRoot = styled.input<TextInputRootProps>`
    background-color: ${colors.grey2};
    border-radius: ${borders.radius.base};
    color: inherit;
    font: inherit;
    outline: none;
    width: 100%;
    padding: ${pt(0.5)};

    &:focus {
        border-color: ${colors.blue0};
    }

    ${(props) => {
        if (props.$isValid) {
            return `
                border: 1px solid ${colors.grey0};
            `;
        } else {
            return `
                border: 1px solid ${colors.red_F4};
            `;
        }
    }}
`;

export const TextInput: FC<TextInputProps> = ({
    value,
    autoComplete,
    isValid = true,
    type = "text",
    onChange,
}) => {
    return (
        <TextInputRoot
            autoComplete={autoComplete}
            value={value}
            type={type}
            $isValid={isValid}
            onChange={(event) => onChange(event.currentTarget.value)}
        />
    );
};
