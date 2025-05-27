import { Router } from 'express';
import { RequestController } from '../controllers/requestController';
import { validateBody, validateQuery } from '../middleware/validate';
import { cancelRequestSchema, createRequestSchema, finishRequestSchema, getRequestsQuerySchema } from '../validators/requestValidators';

const router = Router();
const requestController = new RequestController();

const setRoutes = () => {
    router.post('/requests', validateBody(createRequestSchema), requestController.createRequest.bind(requestController));
    router.patch('/requests/:id/take', requestController.takeRequest.bind(requestController));
    router.patch('/requests/:id/finish', validateBody(finishRequestSchema), requestController.finishRequest.bind(requestController));
    router.patch('/requests/:id/cancel', validateBody(cancelRequestSchema), requestController.cancelRequest.bind(requestController));
    router.get('/requests', validateQuery(getRequestsQuerySchema), requestController.getRequests.bind(requestController));
    router.delete('/requests/cancel-in-progress', requestController.cancelInProgressRequests.bind(requestController));

    return router;
};

export default setRoutes;