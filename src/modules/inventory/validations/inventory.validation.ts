import Joi from "joi";

export const addInventorySchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(5).optional(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(0).required(),
});

export const updateInventorySchema = Joi.object({
    name: Joi.string().min(2).optional(),
    description: Joi.string().min(5).optional(),
    price: Joi.number().positive().optional(),
    quantity: Joi.number().integer().min(0).optional(),
}).min(1); 

export const getInventorySchema = Joi.object({
    id: Joi.string().uuid().required(),
});

export const getAllInventorySchema = Joi.object({});

export const deleteInventorySchema = Joi.object({
    id: Joi.string().uuid().required(),
});
