const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

const swaggerDocs = (app, port) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
 
module.exports = { swaggerDocs };  
