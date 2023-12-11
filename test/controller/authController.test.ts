import request from "supertest";
import app from "../../src";
import connect, { MongoHelper } from "../db-helper";

const AUTH_URL = "/api/v1/auth/";

describe("User controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should login and get profile", async () => {
    const email = "login_profile@gmail.com";
    const password = "test123";
    const name = "loginProfile";
    const signupResponse = await request(app)
      .post(AUTH_URL + "signup")
      .send({
        name: name,
        email: email,
        password: password,
      });
    const newUser = signupResponse.body;
    expect(newUser.name).toEqual(name);
    expect(newUser.email).toEqual(email);
    const loginResponse = await request(app)
      .post(AUTH_URL + "login")
      .send({
        email: email,
        password: password,
      });
    const auth = loginResponse.body;
    const profileResponse = await request(app)
      .get(AUTH_URL + "profile")
      .set("Authorization", "bearer " + auth.accessToken);
    const userProfile = profileResponse.body;
    expect(userProfile.name).toEqual(name);
    expect(userProfile.email).toEqual(email);
  });
});
