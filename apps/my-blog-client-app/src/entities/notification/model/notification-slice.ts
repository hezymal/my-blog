"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { parseDate } from "@/shared/lib/date";
import { NotificationEntry, NotificationEntryCreation } from "./notification";

interface NotificationState {
    entries: NotificationEntry[];
}

const NOTIFICATION_SLICE_NAME = "notification";
const ENTRY_LIFE_TIME = 10000;

const initialState: NotificationState = {
    entries: [],
};

export const notificationSlice = createSlice({
    name: NOTIFICATION_SLICE_NAME,
    initialState,
    reducers: {
        addNotificationEntry: (
            state,
            action: PayloadAction<NotificationEntryCreation>
        ) => {
            const id = state.entries.length;
            const type = action.payload.type;
            const message = action.payload.message;
            const createdDate = new Date().toISOString();

            state.entries.push({ id, type, message, createdDate });
        },
        removeOutdatedNotificationEntries: (state) => {
            const outdate = new Date().getTime() - ENTRY_LIFE_TIME;

            state.entries = state.entries.filter((entry) => {
                const time = parseDate(entry.createdDate).getTime();
                return time > outdate;
            });
        },
    },
});

export const { addNotificationEntry, removeOutdatedNotificationEntries } =
    notificationSlice.actions;
