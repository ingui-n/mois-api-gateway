import {authorize} from "./authorization.js";
import {commonForwarder} from "./routes/commonForwarder.js";
import {status} from "./routes/status.js";

Bun.serve({
  port: 3000,
  routes: {
    '/status': () => withCORS(() => new Response("OK")),
    '/status/computers': req => status(req, Bun.env.MICROSERVICE_COMPUTERS),
    '/status/reservations': req => status(req, Bun.env.MICROSERVICE_RESERVATIONS),

    '/faculty': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      POST: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
    },
    '/faculty/:id': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      PUT: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
      DELETE: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)
    },

    '/computerRoom': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      POST: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
    },
    '/computerRoom/:id': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      PUT: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
      DELETE: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)
    },

    '/computer': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      POST: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
    },
    '/computer/:id': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      PUT: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
      DELETE: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)
    },

    '/computerConfig': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      POST: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
    },
    '/computerConfig/:id': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      PUT: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
      DELETE: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)
    },

    '/reservations': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS),
    },
    '/reservation': {
      GET: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS),
      POST: req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_RESERVATIONS),
    },
    '/reservation/:id': {
      DELETE: req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS),
    },
  },

  fetch(req) {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": Bun.env.FRONTEND_URL,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    console.error('Requested route not found:', req);
    return new Response("Not Found", {status: 404});
  },
});

console.log('Server started on port 3000');
