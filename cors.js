export const withCORS = (handler) => {
  return async (req) => {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": Bun.env.FRONTEND_URL,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const res = handler(req);

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", Bun.env.FRONTEND_URL);

    return new Response(res.body, {
      status: res.status,
      headers,
    });
  };
};
