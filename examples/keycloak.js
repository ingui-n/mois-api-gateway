const adminTokenResp = await fetch(
  "https://mois-keycloak.inguin.cz/realms/reservation-system/protocol/openid-connect/token",
  {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      client_id: "frontend",
      client_secret: "s0Rt6sVXRsRl4gJmcOqTj2JvV1F98EtO",
      grant_type: "client_credentials",
    }),
  }
);

/*const adminTokenResp = await fetch(
  "https://mois-keycloak.inguin.cz/realms/master/protocol/openid-connect/token",
  {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      client_id: "admin-cli",
      grant_type: "password",
      username: "kc-admin",
      password: "ReservationSystem161025",
    }),
  }
);*/


const {access_token} = await adminTokenResp.json();
// console.log(access_token)

const createUser = async () => {
  const resp = await fetch(
    "https://mois-keycloak.inguin.cz/admin/realms/reservation-system/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        username: "vasule123",
        email: "fdgdfgd@email.cz",
        enabled: true,
        "emailVerified": true,
        "firstName": "Johna",
        "lastName": "Dosfd",
        credentials: [
          {
            type: "password",
            value: "numaJEduma",
            temporary: false,
          },
        ],
      }),
    }
  );

  if (resp.ok) {
    const json = await resp.json();
    console.log(json);
  } else {
    console.log(resp)
  }

  console.log("User creation:", resp.status);
};

const signIn = async () => {
  const resp = await fetch("https://mois-keycloak.inguin.cz/realms/reservation-system/protocol/openid-connect/token", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      grant_type: "password",
      // client_id: "frontend-prod",
      client_id: "frontend",
      // client_secret: "taVzZUvENxZonAW1HjV0LibUEjdMR1XA", // omit if public client
      client_secret: "s0Rt6sVXRsRl4gJmcOqTj2JvV1F98EtO", // omit if public client
      username: "inguin@seznam.cz",
      // username: "testuser0@email.com",
      password: "numaJEduma",
    }),
  });

  const data = await resp.json();
  console.log(data);
};

// await createUser();
await signIn();
