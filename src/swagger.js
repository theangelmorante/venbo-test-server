const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    components: {
      schemas: {
        Client: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique identifier of the client",
            },
            identification: {
              type: "string",
              description: "Unique identification number for the client",
            },
            firstName: {
              type: "string",
              description: "First name of the client",
            },
            lastName: {
              type: "string",
              description: "Last name of the client",
            },
            email: {
              type: "string",
              description: "Email address of the client",
            },
            address: {
              type: "string",
              description: "Address of the client",
            },
            type: {
              type: "string",
              description: "Type of client (PERSON or COMPANY)",
            },
            employees: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "List of employees' IDs associated with the client (only for COMPANY type)",
            },
          },
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"], // Rutas a tus archivos de rutas y modelos
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwaggerDocs;
