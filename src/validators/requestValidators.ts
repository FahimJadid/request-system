import { z } from 'zod';

export const createRequestSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    text: z.string().min(1, 'Text is required'),
});

export const finishRequestSchema = z.object({
    solution: z.string().min(1, 'Solution is required'),
});

export const cancelRequestSchema = z.object({
    reason: z.string().min(1, 'Cancellation reason is required'),
});

export const getRequestsQuerySchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});