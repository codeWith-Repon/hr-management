import Joi from "joi";

const createEmployeeSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(50)
        .required(),
    age: Joi
        .number()
        .integer()
        .min(18)
        .max(65)
        .required(),
    designation: Joi
        .string()
        .required(),
    hiring_date: Joi
        .date()
        .iso()
        .required(),
    date_of_birth: Joi
        .date()
        .iso()
        .required(),
    salary: Joi
        .number()
        .precision(2)
        .required()
})

const updateEmployeeSchema = createEmployeeSchema
    .fork(
        ['name', 'age', 'designation', 'hiring_date', 'date_of_birth', 'salary'],
        (schema) => schema.optional()
    )
    .min(1);
    
export const EmployeeValidation = {
    createEmployeeSchema,
    updateEmployeeSchema,
};