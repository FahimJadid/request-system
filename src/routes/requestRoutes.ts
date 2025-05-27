import { Router } from 'express';
import { RequestController } from '../controllers/requestController';
import { validateBody, validateQuery } from '../middleware/validate';
import { cancelRequestSchema, createRequestSchema, finishRequestSchema, getRequestsQuerySchema } from '../validators/requestValidators';

const router = Router();
const requestController = new RequestController();

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: API for managing requests
 */

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Create a new request
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - text
 *             properties:
 *               subject:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Request created
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all requests (optionally filter by date range)
 *     tags: [Requests]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of requests
 */

/**
 * @swagger
 * /requests/{id}/take:
 *   patch:
 *     summary: Take a request to work
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     responses:
 *       200:
 *         description: Request taken
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /requests/{id}/finish:
 *   patch:
 *     summary: Finish processing a request
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - solution
 *             properties:
 *               solution:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request finished
 *       400:
 *         description: Validation error
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /requests/{id}/cancel:
 *   patch:
 *     summary: Cancel a request
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request canceled
 *       400:
 *         description: Validation error
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /requests/cancel-in-progress:
 *   delete:
 *     summary: Cancel all "In progress" requests
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: All in-progress requests canceled
 */

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