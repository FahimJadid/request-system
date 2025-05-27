import mongoose, { Document, Schema } from 'mongoose';

export enum RequestStatus {
    New = 'New',
    InProgress = 'In progress',
    Completed = 'Completed',
    Canceled = 'Canceled'
}

export interface IRequest extends Document {
    subject: string;
    text: string;
    status: RequestStatus;
    solution?: string;
    cancellationReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

const requestSchema: Schema = new Schema({
    subject: { type: String, required: true },
    text: { type: String, required: true },
    status: { type: String, enum: Object.values(RequestStatus), default: RequestStatus.New },
    solution: { type: String, default: null },
    cancellationReason: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

requestSchema.pre<IRequest>('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const RequestModel = mongoose.model<IRequest>('Request', requestSchema);

export default RequestModel;