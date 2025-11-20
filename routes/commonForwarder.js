import {addCORSHeaders} from "../cors.js";

export const commonForwarder = async (req, forwardUrl, payload) => {
  const redirectUrl = new URL(forwardUrl);
  const url = new URL(req.url);

  url.host = redirectUrl.host;
  url.protocol = redirectUrl.protocol;

  let body = null;

  if (req.body) {
    try {
      const jsonBody = await req.body.json();
      body = JSON.stringify(jsonBody);
    } catch (e) {
      console.error(e.message);
      return new Response("Bad request", {status: 400});
    }
  }

  return fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
      'Content-Type': 'application/json',
      'X-User-Id': payload.sub,
      'X-User-Email': payload.email,
      'X-User-Firstname': encodeURIComponent(payload.given_name),
      'X-User-Lastname': encodeURIComponent(payload.family_name),
      'X-User-Roles': JSON.stringify(payload.realm_access.roles),
    },
    body: body,
    duplex: "half",
  })
    .then(async (upstreamRes) => {
      const body = await upstreamRes.arrayBuffer();

      const headers = addCORSHeaders(upstreamRes.headers);

      return new Response(body, {
        status: upstreamRes.status,
        headers,
      });
    })
    .catch((err) => {
      return Response.json(err.message, {status: 500});
    });
};

export const commonForwarder2 = async (req, forwardUrl, payload) => {
  const redirectUrl = new URL(forwardUrl);
  const url = new URL(req.url);

  url.host = redirectUrl.host;
  url.protocol = redirectUrl.protocol;

  let body = null;

  if (req.body) {
    try {
      const jsonBody = await req.body.json();
      body = JSON.stringify(jsonBody);
    } catch (e) {
      console.error(e.message);
      return new Response("Invalid JSON body", {status: 400});
    }
  }

  return fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
      'X-User-Id': payload.sub,
      'X-User-Email': payload.email,
      'X-User-Firstname': encodeURIComponent(payload.given_name),
      'X-User-Lastname': encodeURIComponent(payload.family_name),
      'X-User-Roles': JSON.stringify(payload.realm_access.roles),
    },
    body: body,
    duplex: "half",
  })
    .catch((err) => {
      return Response.json(err.message, {status: 500});
    });
};
