import Joi from "joi";

const getChatValidator = Joi.object().keys({
  prompt: Joi.string().required(),
});

const exportObject = {
  getChatValidator,
};

export = exportObject;
