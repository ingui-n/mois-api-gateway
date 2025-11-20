import {addCORSHeaders} from "../cors.js";

export const status = async (req, forwardUrl) => {
  const redirectUrl = new URL(forwardUrl);
  const url = new URL(req.url);

  url.host = redirectUrl.host;
  url.protocol = redirectUrl.protocol;
  url.pathname = '/status';

  return fetch(url, {
    method: 'GET',
    headers: {
      ...req.headers,
    },
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
