export interface RequestData {
    id: string;
    subject: string;
    text: string;
    status: RequestStatus;
    solution?: string;
    cancellationReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum RequestStatus {
    New = "New",
    InProgress = "In progress",
    Completed = "Completed",
    Canceled = "Canceled"
}


export {};