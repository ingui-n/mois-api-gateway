export const withCORS = (handler) => async (req) => {
  const allowedOrigins = Bun.env.ALLOWED_ORIGINS.split(',');

  const origin = req.headers.get("origin");
  const corsOrigin = allowedOrigins.includes(origin) ? origin : "";

  console.log('request origin:', origin)
  console.log('selected from env:', corsOrigin)

  const requestedHeaders = req.headers.get("Access-Control-Request-Headers") || "";

  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": corsOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": requestedHeaders,
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

export const addCORSHeaders = upstreamHeaders => {
  const headers = new Headers(upstreamHeaders);

  headers.set("Access-Control-Allow-Origin", Bun.env.FRONTEND_URL);
  headers.set("Access-Control-Allow-Credentials", "true");

  return headers;
};
