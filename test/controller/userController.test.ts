
import request from "supertest";
import app from "../../src";
import connect, { MongoHelper } from "../db-helper";

const USERS_URL = "/api/v1/users/";

describe("User controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createUser(emailPrefix: string) {
    const email = emailPrefix + "@gmail.com";
    const response = await request(app).post(USERS_URL).send({
      name: "Test user",
      email,
      password: "test123",
      role: "User",
    });
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Test user");
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toEqual(email);
    expect(response.body).toHaveProperty("role");
    expect(response.body.role).toEqual("User");
    return response;
  }

  it("Should create a user", async () => {
    await createUser("create");
  });

  it("should get the user", async () => {
    const userResponse = await createUser("get");
    const userId = userResponse.body._id.toString();

    const response = await request(app).get(USERS_URL + userId);

    expect(response.body).toMatchObject({
      _id: userId,
    });
  });

  it("should update the user", async () => {
    const userResponse = await createUser("update");
    const userId = userResponse.body._id.toString();

    const response = await request(app)
      .put(USERS_URL + userId)
      .send({
        name: "Updated user",
        email: "update@gmail.com",
        password: "test123",
        role: "User",
      });
    expect(response.body.name).toEqual("Updated user");
    expect(response.body.email).toEqual("update@gmail.com");
  });

  it("should delete the user", async () => {
    const userResponse = await createUser("delete");
    const userId = userResponse.body._id.toString();

    const response = await request(app).delete(USERS_URL + userId);
    expect(response.body._id).toEqual(userId);
  });

  it("should login and get profile", async () => {
    const email = "login_profile@gmail.com";
    const password = "test123";
    const name = "loginProfile";
    const signupResponse = await request(app)
      .post(USERS_URL + "signup")
      .send({
        name: name,
        email: email,
        password: password,
      });
    const newUser = signupResponse.body;
    expect(newUser.name).toEqual(name);
    expect(newUser.email).toEqual(email);
    const loginResponse = await request(app)
      .post(USERS_URL + "login")
      .send({
        email: email,
        password: password,
      });
    const auth = loginResponse.body;
    const profileResponse = await request(app)
      .get(USERS_URL + "profile")
      .set("Authorization", "bearer " + auth.accessToken);
    const userProfile = profileResponse.body;
    expect(userProfile.name).toEqual(name);
    expect(userProfile.email).toEqual(email);
  });
});
