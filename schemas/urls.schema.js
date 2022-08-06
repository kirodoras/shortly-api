import joi from "joi";

const urlSchema = joi.string().uri().required();

export { urlSchema };
