export type NotificationEntryType = "info" | "success" | "error";

export interface NotificationEntryCreation {
    message: string;
    type: NotificationEntryType;
}

export interface NotificationEntry {
    id: number;
    message: string;
    createdDate: string;
    type: NotificationEntryType;
}
