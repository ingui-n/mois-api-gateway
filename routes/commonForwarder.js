export const commonForwarder = async (req, forwardUrl, payload) => {
  const redirectUrl = new URL(forwardUrl);
  const url = new URL(req.url);

  url.host = redirectUrl.host;
  url.protocol = redirectUrl.protocol;

  /*let body = null;

  if (req.body !== null) {
    body = req.body;

    if (req.method === 'POST') {
      //todo check payload fileds
      body = {...body, payload}
    }
  }*/

  return fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
    duplex: "half",
  });
};
