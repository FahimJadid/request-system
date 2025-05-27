import { Request, Response, NextFunction } from 'express';
import * as requestService from '../services/requestService';
import { RequestData as RequestType, RequestStatus } from '../types/request';

export class RequestController {
    async createRequest(req: Request, res: Response, next: NextFunction) {
        const { subject, text } = req.body;
        try {
            const newRequest: RequestType = await requestService.createRequest(subject, text);
            res.status(201).json(newRequest);
        } catch (error) {
            next(error);
        }
    }

    async takeRequest(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const updatedRequest = await requestService.updateRequestStatus(id, RequestStatus.InProgress);
            res.status(200).json(updatedRequest);
        } catch (error) {
            next(error);
        }
    }

    async finishRequest(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { solution } = req.body;
        try {
            const updatedRequest = await requestService.finishRequest(id, solution);
            res.status(200).json(updatedRequest);
        } catch (error) {
            next(error);
        }
    }

    async cancelRequest(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { reason } = req.body;
        try {
            const updatedRequest = await requestService.cancelRequest(id, reason);
            res.status(200).json(updatedRequest);
        } catch (error) {
            next(error);
        }
    }

    async getRequests(req: Request, res: Response, next: NextFunction) {
        const { startDate, endDate } = req.query;
        try {
            const requests = await requestService.findRequests(
                typeof startDate === 'string' ? startDate : undefined,
                typeof endDate === 'string' ? endDate : undefined
            );
            res.status(200).json(requests);
        } catch (error) {
            next(error);
        }
    }

    async cancelInProgressRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await requestService.cancelAllInProgress();
            res.status(200).json({ message: `${result} requests canceled.` });
        } catch (error) {
            next(error);
        }
    }
}