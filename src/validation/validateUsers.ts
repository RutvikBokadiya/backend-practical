import Joi from "joi";

const loginValidator = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).alphanum().required(),
});

const registerValidator = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).alphanum().required(),
  name: Joi.string().required(),
});

const exportObject = {
  loginValidator,
  registerValidator,
};

export = exportObject;
