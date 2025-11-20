export const withCORS = (handler) => {
  return async (req) => {
    const allowedOrigins = Bun.env.ALLOWED_ORIGINS.split(',');

    const origin = req.headers.get("origin");
    const corsOrigin = allowedOrigins.includes(origin) ? origin : "";

    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": corsOrigin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true",
        },
      });
    }

    const res = await handler(req);

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", corsOrigin);
    headers.set("Access-Control-Allow-Credentials", "true");

    return new Response(res.body, {
      status: res.status,
      headers,
    });
  };
};

export const addCORSHeaders = upstreamHeaders => {
  const headers = new Headers(upstreamHeaders);

  headers.set("Access-Control-Allow-Origin", Bun.env.FRONTEND_URL);
  headers.set("Access-Control-Allow-Credentials", "true");

  return headers;
};
