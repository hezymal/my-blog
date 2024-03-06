import { FC, Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Alert } from "@/shared/ui/alert";
import { Card } from "@/shared/ui/card";
import { removeOutdatedNotificationEntries } from "../model/notification-slice";
import { ButtonColor, IconButton } from "@/shared/ui/button";
import { Grid, GridCell } from "@/shared/ui/grid";
import { NotificationEntryType } from "../model/notification";

const getIconColorByEntryType = (
    entryType: NotificationEntryType
): ButtonColor => {
    switch (entryType) {
        case "success":
            return "light-success";

        case "info":
            return "light-default";

        case "error":
            return "light-danger";
    }
};

export const NotificationEntries: FC = () => {
    const dispatch = useAppDispatch();
    const entries = useAppSelector((state) => state.notification.entries);

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(removeOutdatedNotificationEntries());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch]);

    return (
        <Fragment>
            {entries.map((entry) => (
                <Card key={entry.id}>
                    <Alert align="left" type={entry.type}>
                        <Grid>
                            <GridCell valign="middle" size={10}>
                                {entry.message}
                            </GridCell>
                            <GridCell align="right" valign="top" size={2}>
                                <IconButton
                                    color={getIconColorByEntryType(entry.type)}
                                    iconType="close"
                                />
                            </GridCell>
                        </Grid>
                    </Alert>
                </Card>
            ))}
        </Fragment>
    );
};
