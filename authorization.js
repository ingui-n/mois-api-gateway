import {createRemoteJWKSet, jwtVerify} from "jose";

/**
 * vytvoří remote JWK
 * @type {{(protectedHeader?: JWSHeaderParameters, token?: FlattenedJWSInput): Promise<CryptoKey>, coolingDown: boolean, fresh: boolean, reloading: boolean, reload: () => Promise<void>, jwks: () => (JSONWebKeySet | undefined)}}
 */
const JWKS = createRemoteJWKSet(
  new URL(`${Bun.env.KEYCLOAK_URL}/realms/${Bun.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`)
);

/**
 * extrahuje datový objekt z JWT a ověří jeho platnost
 * @param req
 * @returns {Promise<(JWTPayload & JWTPayload)|null>}
 */
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

/**
 * vrací boolean na základě výsytu role v payload
 * @param payload
 * @param role
 * @returns boolean
 */
const hasRole = (payload, role = "") => {
  return payload?.realm_access?.roles.includes(role);
};

/**
 * autorizace uživatele
 * @param req
 * @param handler
 * @param role
 * @param forwardUrl
 * @returns {Promise<Response>}
 */
export const authorize = async (req, handler, role = "", forwardUrl = "") => {
  const payload = await verifyToken(req);

  if (!payload)
    return new Response("Unauthorized", {status: 401});

  if (role && !hasRole(payload, role))
    return new Response("Forbidden", {status: 403});

  // removes authorization header
  req.headers.delete("authorization");

  return handler(req, forwardUrl, payload);
};
