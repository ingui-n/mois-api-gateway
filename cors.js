/**
 * vrací požadavek s hlavičkou CORS
 * @param handler
 * @returns {(function(*): Promise<Response>)|*}
 */

export const withCORS = (handler) => async (req) => {
  /** ALLOWED_ORIGINS ve tvaru: http://localhost:8080,https://domena.cz */
  const allowedOrigins = Bun.env.ALLOWED_ORIGINS.split(',');

  const origin = req.headers.get("origin");

  /** vybere origin ze seznamu povolených */
  const corsOrigin = allowedOrigins.includes(origin) ? origin : "";

  const requestedHeaders = req.headers.get("Access-Control-Request-Headers") || "";

  /** pouze pro "zjišťování" cest kvůli NextJS */
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": corsOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": requestedHeaders || "Content-Type, Authorization, X-User-Id, X-User-Email, X-User-Firstname, X-User-Lastname, X-User-Roles",
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
