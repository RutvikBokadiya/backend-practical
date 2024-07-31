import app from "../Connection/routes";
const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: "",
      title: "",
      version: "1.0.0",
    },
    host: `localhost:${3001}`,
    basePath: "/",
    produces: ["application/json"],
    schemes: ["https", "http"],
    securityDefinitions: {      
      User: {
        type: "apiKey",
        in: "header",
        name: "x-access-token",
        description: "User token",
      }
    },
  },
  basedir: __dirname, //app absolute path
  files: ["../routes/*.js"], //Path to the API handle folder
};
expressSwagger(options);