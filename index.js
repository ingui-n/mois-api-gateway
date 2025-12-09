import {authorize} from "./authorization.js";
import {commonForwarder} from "./routes/commonForwarder.js";
import {status} from "./routes/status.js";
import {withCORS} from "./cors.js";

Bun.serve({
  port: 3000,
  routes: {
    '/status': withCORS(() => new Response("OK")),
    '/status/computers': withCORS(req => status(req, Bun.env.MICROSERVICE_COMPUTERS)),
    '/status/reservations': withCORS(req => status(req, Bun.env.MICROSERVICE_RESERVATIONS)),
    '/test': withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS)),
    '/faculty': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS)),
      POST: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)),
    },
    '/faculty/:id': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS)),
      PUT: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)),
      DELETE: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS))
    },

    '/computerRoom': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS)),
      POST: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)),
    },
    '/computerRoom/:id': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS)),
      PUT: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)),
      DELETE: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS))
    },

    '/computer': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS)),
      POST: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)),
    },
    '/computer/:id': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS)),
      PUT: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)),
      DELETE: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS))
    },

    '/computerConfig': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS)),
      POST: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)),
    },
    '/computerConfig/:id': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS)),
      PUT: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)),
      DELETE: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS))
    },

    '/reservations': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS)),
    },
    '/reservation': {
      GET: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS)),
      POST: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS)),
    },
    '/reservation/:id': {
      DELETE: withCORS(req => authorize(req, commonForwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS)),
    },
  },

  /**
   * Pro HTTP metodu OPTIONS z důvodů CORS a pro vrácení 404 při neplatné cestě
   * @param req
   * @returns {Promise<Response>}
   */

  fetch(req) {
    if (req.method === 'OPTIONS') {
      return withCORS(() => new Response(null))(req);
    }

    console.error('Requested route not found:', req.method, req.url);
    return withCORS(() => new Response("Not Found", {status: 404}))(req);
  },
});

console.log('Server started on port 3000');
