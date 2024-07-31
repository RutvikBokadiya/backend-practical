import { ERROR_MESSAGES, STATUS_CODE, SUCCESS_MESSAGES } from "../constant";
import { createToken } from "../utils/authentication";
import { successMiddleware } from "../utils/middleware";
import db from "../Connection/index";
import { NextFunction, Request, Response, Express } from "express";
import { comparePassword, securePassword } from "../utils/common";
import { makeGetApiCall } from "../Connection/axios";
import { where } from "sequelize";
const apiKey = process.env.OPENWEATHER_API_KEY;

export async function getWeather(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Find the user by email

    const city = req.body.city.trim().toLowerCase();

    let weatherReport = await makeGetApiCall(
      `${process.env.WEATHER_URI}`,
      {
        q: city,
        appid: apiKey,
      },
      {
        "Content-Type": "application/json",
      }
    );
    console.log("---weatherReport",weatherReport);
    
    let weatherRes: any = {
      status: false,
      temperature: "-",
      description: "-",
      city,
    };
    const weather = await db.weather.findOne({ where: { city } });
    if (weather && !weatherReport) {
      let weatherData = await db.weather.findOne({
        attributes: ["city", "temperature", "description"],
        where: { city },
      });
      if (weatherData && weatherData.dataValues) {
        weatherRes = weatherData.dataValues;
        weatherRes.status = true;
      }
    } else if (weatherReport) {
      let description =
        weatherReport?.weather[1]?.description ||
        weatherReport?.weather[0]?.description ||
        "";
      let temperature = (weatherReport?.main?.temp - 273.15).toFixed(2);
      weatherRes = {
        status: true,
        city,
        temperature,
        description,
      };
      if (!weather) {
        let weatherData = {
          lon: weatherReport.coord.lon,
          lat: weatherReport.coord.lat,
          city,
          description: description,
          // Convert temperature from Kelvin to Celsius
          temperature,
          timezone: weatherReport?.timezone,
          country: weatherReport?.sys?.country,
        };
        await db.weather.create(weatherData);
      } else {
        await db.weather.update(
          {
            description,
            temperature,
          },
          {
            where: { city },
          }
        );
      }
    }

    // send success response
    return successMiddleware(
      {
        message: SUCCESS_MESSAGES.COMMON.FETCH_SUCCESS.replace(
          ":attribute",
          "weather"
        ),
        data: { weatherReport: weatherRes },
      },
      req,
      res,
      next
    );
  } catch (error) {
    console.log("*error while register user* ", error);
    next(error);
  }
}
