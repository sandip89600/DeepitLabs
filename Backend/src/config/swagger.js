const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition details
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DeepItLabs Developer Mentorship API',
            version: '1.0.0',
            description: 'Production-ready REST API for the DeepItLabs developer training platform. Enforces JWT auth guards, Multer buffer file uploads, role-based filters, and MongoDB course stats aggregations.'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Local development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    // Scan routes directory for OpenAPI comments
    apis: ['./src/routes/*.js'] 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
};
