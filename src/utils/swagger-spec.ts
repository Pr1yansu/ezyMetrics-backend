import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EzyMetrics API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*"],
});

export default swaggerSpec;
