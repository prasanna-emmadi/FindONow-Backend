import request from "supertest";
const AUTH_URL = "/api/v1/auth/";

export async function getAccessToken(
  app: any,
  email: string,
  password: string
) {
  const loginResponse = await request(app)
    .post(AUTH_URL + "login")
    .send({
      email: email,
      password: password,
    });
  expect(loginResponse.status).toBe(200);
  const auth = loginResponse.body;
  return auth.token.accessToken;
}

export async function signupUserAndGetToken(
  app: any,
  email: string,
  password: string
) {
  const userResponse = await request(app)
    .post(AUTH_URL + "signup")
    .send({
      name: "Test cat",
      email: email,
      password: password,
      role: "ADMIN",
    });
  expect(userResponse.statusCode).toBe(201);
  const userId = userResponse.body._id;
  const accessToken = await getAccessToken(app, email, password);
  return [userId, accessToken];
}
