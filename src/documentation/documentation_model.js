
const swaggerSpec = {
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Disney REST API - nodejs",
        version: "0.1.0",
        description: "This is a simple CRUD  Disney API application made with Express and documented with Swagger",
        contact: {
            name: "Santiago Triviño",
            url: "https://github.com/santiagoTrivi",
            email: "santiagocarvajal103@gmail.com",
        },
    },
      servers: [
        {
          url: "http://localhost:3031/disneyApi",
        },
        {
          url: "http://localhost:3031"
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./src/routes/*.js"],
  };



module.exports = {
    swaggerSpec
};




const option  = {
    definition: {
        swagger: "2.0",
        openapi: "3.1.0",
        info: {
            title: "Disney REST API - nodejs",
            version: "0.1.0",
            description: "This is a simple CRUD  Disney API application made with Express and documented with Swagger",
            contact: {
                name: "Santiago Triviño",
                url: "https://github.com/santiagoTrivi",
                email: "santiagocarvajal103@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3031"
            },
            {
                url: "http://localhost:3031/disneyApi"
            }
        ]
    },
    apis: ["./src/routes/*.js"],

};
