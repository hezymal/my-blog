import { FC } from "react";
import styled from "styled-components";
import { colors } from "@client-app/shared/lib/colors";
import { pt } from "@client-app/shared/lib/sizes";

interface UserIconProps {
    userName: string;
}

const UserIconRoot = styled.div`
    background-color: ${colors.grey2};
    border-radius: 50%;
    text-align: center;
    text-transform: uppercase;
    width: ${pt(4)};
    height: ${pt(4)};
    line-height: ${pt(4)};
    font-weight: 700;
`;

export const UserIcon: FC<UserIconProps> = ({ userName }) => {
    const firstLetter = userName.at(0);

    return <UserIconRoot>{firstLetter}</UserIconRoot>;
};
