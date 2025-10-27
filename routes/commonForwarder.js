export const commonForwarder = async (req, forwardUrl, payload) => {
  const redirectUrl = new URL(forwardUrl);
  const url = new URL(req.url);

  url.host = redirectUrl.host;
  url.protocol = redirectUrl.protocol;

  return fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
      'X-User-Id': payload.sub,
      'X-User-Email': payload.email,
      'X-User-Firstname': payload.given_name,
      'X-User-Lastname': payload.family_name,
      'X-User-Roles': JSON.stringify(payload.realm_access.roles),
    },
    body: req.body,
    duplex: "half",
  })
    .catch((err) => {
      return Response.json(err.message, {status: 500});
    });
};
