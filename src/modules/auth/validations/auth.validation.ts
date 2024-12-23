import Joi from "joi";

export const userRegistrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().email().required()
});