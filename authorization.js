import {createRemoteJWKSet, jwtVerify} from "jose";

const JWKS = createRemoteJWKSet(
  new URL(`${Bun.env.KEYCLOAK_URL}/realms/${Bun.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`)
);

const verifyToken = async req => {
  const auth = req.headers.get("authorization");

  if (!auth?.startsWith("Bearer "))
    return null;

  const token = auth.replace(/^Bearer\s+/i, "");

  try {
    const {payload} = await jwtVerify(token, JWKS, {
      issuer: `${Bun.env.KEYCLOAK_URL}/realms/${Bun.env.KEYCLOAK_REALM}`
    });

    if (!Bun.env.KEYCLOAK_CLIENT_ID.split(',').includes(payload?.azp))
      return null;

    return payload;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

const hasRole = (payload, role = "") => {
  return payload?.realm_access?.roles.includes(role);
};

export const authorize = async (req, handler, role = "", forwardUrl = "") => {
  const payload = await verifyToken(req);
  if (!payload)
    return new Response("Unauthorized", {status: 401});
  console.log(payload)
  if (role && !hasRole(payload, role))
    return new Response("Forbidden", {status: 403});

  // removes authorization header
  req.headers.delete("authorization");

  return handler(req, forwardUrl, payload);
};
