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
    .catch((err) => {
      return Response.json(err.message, {status: 500});
    });
};
