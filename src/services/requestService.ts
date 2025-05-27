import RequestModel from '../models/requestModel';
import { RequestData, RequestStatus } from '../types/request';

// Helper to convert Mongoose document to RequestData
const toRequestData = (doc: any): RequestData => ({
    id: doc._id.toString(),
    subject: doc.subject,
    text: doc.text,
    status: doc.status,
    solution: doc.solution,
    cancellationReason: doc.cancellationReason,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});

export const createRequest = async (subject: string, text: string): Promise<RequestData> => {
    const request = new RequestModel({
        subject,
        text,
        status: RequestStatus.New,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const saved = await request.save();
    return toRequestData(saved);
};

export const updateRequestStatus = async (id: string, status: RequestStatus): Promise<RequestData | null> => {
    const updated = await RequestModel.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true }
    );
    return updated ? toRequestData(updated) : null;
};

export const finishRequest = async (id: string, solution: string): Promise<RequestData | null> => {
    const updated = await RequestModel.findByIdAndUpdate(
        id,
        {
            status: RequestStatus.Completed,
            solution,
            updatedAt: new Date(),
        },
        { new: true }
    );
    return updated ? toRequestData(updated) : null;
};

export const cancelRequest = async (id: string, reason: string): Promise<RequestData | null> => {
    const updated = await RequestModel.findByIdAndUpdate(
        id,
        {
            status: RequestStatus.Canceled,
            cancellationReason: reason,
            updatedAt: new Date(),
        },
        { new: true }
    );
    return updated ? toRequestData(updated) : null;
};

export const findRequests = async (startDate?: string, endDate?: string): Promise<RequestData[]> => {
    const filter: any = {};
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) {
            // If endDate is a date string without time, set it to the end of the day
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            filter.createdAt.$lte = end;
        }
        // Remove createdAt if it's empty (shouldn't happen, but for safety)
        if (Object.keys(filter.createdAt).length === 0) {
            delete filter.createdAt;
        }
    }
    const docs = await RequestModel.find(filter);
    return docs.map(toRequestData);
};

export const cancelAllInProgress = async (): Promise<number> => {
    const result = await RequestModel.updateMany(
        { status: RequestStatus.InProgress },
        { status: RequestStatus.Canceled, updatedAt: new Date() }
    );
    return (result as any).modifiedCount ?? (result as any).nModified ?? 0;
};