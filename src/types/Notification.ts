export type Notifications = {
    id: number;
    type: string;
    content: string | null;
    recipientId: string;
    issuerId: string;
    ideaId: number | null;
    createdAt: Date;
    readAt: Date | null;
}