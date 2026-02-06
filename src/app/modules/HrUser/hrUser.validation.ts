import Joi from 'joi';

const createHrUserSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const updateHrUserSchema = createHrUserSchema.fork(
    ["name", "email", "password"],
    (schema) => schema.optional()
)

export const HrUserValidation = {
    createHrUserSchema,
    updateHrUserSchema
};