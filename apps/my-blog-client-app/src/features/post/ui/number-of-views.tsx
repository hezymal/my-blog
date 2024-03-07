import { FC } from "react";
import { shortenNumber } from "@client-app/shared/lib/number";

interface NumberOfViewsProps {
    numberOfViews: number;
}

export const NumberOfViews: FC<NumberOfViewsProps> = ({ numberOfViews }) => {
    return <span>{shortenNumber(numberOfViews)} views</span>;
};
