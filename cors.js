export const withCORS = (handler) => {
  return async (req) => {
    const res = handler(req);

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", Bun.env.FRONTEND_URL);
    headers.set("Access-Control-Allow-Credentials", "true");

    return new Response(res.body, {
      status: res.status,
      headers,
    });
  };
};

export const getCORSHeaders = () => {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", Bun.env.FRONTEND_URL);
  headers.set("Access-Control-Allow-Credentials", "true");

  return headers;
};
