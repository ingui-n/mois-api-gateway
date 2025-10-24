import {commonForwarder} from "./commonForwarder.js";

export const forwardGetReservations = async (req, forwardUrl, payload) => {
  const url = new URL(req.url);

  if (url.searchParams.get('userId')) {
    if (url.searchParams.get('userId') !== payload.sub) {
      return new Response('Access denied', {status: 403});
    }
  }

  return commonForwarder(req, forwardUrl, payload);
};
