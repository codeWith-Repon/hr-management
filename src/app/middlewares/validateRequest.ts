import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            if (req.body.data && typeof req.body.data === 'string') {
                req.body = JSON.parse(req.body.data);
            }

            const validatedBody = await schema.validateAsync(req.body, {
                abortEarly: false, //show all errors
                allowUnknown: true, //allow unknown fields
                stripUnknown: true, //remove unknown fields
            });

            req.body = validatedBody;

            next();
        } catch (error) {
            next(error);
        }
    };