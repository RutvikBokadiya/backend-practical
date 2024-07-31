import Joi from "joi";

const getWeatherValidator = Joi.object().keys({
  city: Joi.string().required(),
});

const exportObject = {
  getWeatherValidator,
};

export = exportObject;
