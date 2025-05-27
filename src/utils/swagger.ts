import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Request System API',
      version: '1.0.0',
      description: 'API documentation for the Request System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };