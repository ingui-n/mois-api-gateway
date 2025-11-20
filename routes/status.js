import {getCORSHeaders} from "../cors.js";

export const status = async (req, forwardUrl) => {
  const redirectUrl = new URL(forwardUrl);
  const url = new URL(req.url);

  url.host = redirectUrl.host;
  url.protocol = redirectUrl.protocol;
  url.pathname = '/status';

  const corsHeaders = Object.fromEntries(getCORSHeaders());

  return fetch(url, {
    method: 'GET',
    headers: {
      ...req.headers,
      ...corsHeaders,
    },
    duplex: "half",
  })
    .catch((err) => {
      return Response.json(err.message, {status: 500});
    });
};
