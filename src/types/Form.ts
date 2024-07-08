export type FormState = {
    success: boolean;
    message: string;
    timestamp?: number;
    data?: {
        redirect?: string;
    };
};
