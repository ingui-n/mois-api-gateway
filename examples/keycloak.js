const adminTokenResp = await fetch(
  "http://localhost:8080/realms/realmName/protocol/openid-connect/token",
  {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      client_id: "name-of-client-in-realm",
      client_secret: "some-key-from-client-in-realm",
      grant_type: "client_credentials",
    }),
  }
);

const {access_token} = await adminTokenResp.json();
// console.log(access_token)

const createUser = async () => {
  const resp = await fetch(
    "http://localhost:8080/admin/realms/realmName/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        username: "username",
        email: "user@example.com",
        enabled: true,
        "emailVerified": true,
        "firstName": "John",
        "lastName": "Doe",
        credentials: [
          {
            type: "password",
            value: "newPassword",
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

  // console.log("User creation:", resp.status);
};

const signIn = async () => {
  const resp = await fetch("http://localhost:8080/realms/realmName/protocol/openid-connect/token", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      grant_type: "password",
      client_id: "name-of-client-in-realm",
      client_secret: "some-key-from-client-in-realm", // omit if public client
      username: "username",
      password: "password",
    }),
  });

  const data = await resp.json();
  console.log(data);
};

await signIn();
