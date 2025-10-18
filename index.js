import {authorize} from "./authorization.js";

const forwarder = async (req, forwardUrl, payload) => {
  const redirectUrl = new URL(forwardUrl);
  const url = new URL(req.url);

  url.host = redirectUrl.host;
  url.protocol = redirectUrl.protocol;

  return fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
    duplex: "half",
  });
};

Bun.serve({
  port: 3000,
  routes: {
    '/status': () => new Response("OK"),

    '/faculty': {
      GET: req => authorize(req, forwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      POST: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
    },
    '/faculty/:id': {
      GET: req => authorize(req, forwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      PUT: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
      DELETE: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)
    },

    '/faculty/:facultyId/computerRoom': {
      GET: req => authorize(req, forwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      POST: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
    },
    '/faculty/:facultyId/computerRoom/:id': {
      GET: req => authorize(req, forwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      PUT: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
      DELETE: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)
    },

    '/faculty/:facultyId/computerRoom/:computerRoomId/computer': {
      GET: req => authorize(req, forwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      POST: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
    },
    '/faculty/:facultyId/computerRoom/:computerRoomId/computer/:id': {
      GET: req => authorize(req, forwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_COMPUTERS),
      PUT: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS),
      DELETE: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_COMPUTERS)
    },

    '/reservations': {
      GET: req => authorize(req, forwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS),
    },
    '/reservation': {
      GET: req => authorize(req, forwarder, Bun.env.ROLE_USER, Bun.env.MICROSERVICE_RESERVATIONS),
      POST: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_RESERVATIONS),
    },
    '/reservation/:id': {
      DELETE: req => authorize(req, forwarder, Bun.env.ROLE_ADMIN, Bun.env.MICROSERVICE_RESERVATIONS),
    },
  },

  fetch(req) {
    console.error(req);
    return new Response("Not Found", {status: 404});
  },
});

console.log('Server started on port 3000');
