import Joi from "joi";

const monthlyASSchema = Joi.object({
    month: Joi.string()
        .required()
        .pattern(/^\d{4}-\d{2}$/)
        .messages({
            'string.pattern.base': 'Invalid month format. Use YYYY-MM',
            'any.required': 'Month is a required field',
        }),
    employee_id: Joi.number().integer().positive().optional(),
});


export const ReportValidation = {
    monthlyASSchema,
};