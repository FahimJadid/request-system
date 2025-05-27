import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ errors: result.error.errors });
        return;
    }
    req.body = result.data;
    next();
};

export const validateQuery = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
        res.status(400).json({ errors: result.error.errors });
        return;
    }
    // Instead of reassigning req.query, copy properties
    Object.keys(req.query).forEach(key => delete req.query[key]);
    Object.assign(req.query, result.data);
    next();
};