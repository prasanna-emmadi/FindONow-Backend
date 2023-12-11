import request from "supertest";
import app from "../../src";
import connect, { MongoHelper } from "../db-helper";
import { signupUserAndGetToken } from "../login-helper";

describe("Category controller", () => {
  let mongoHelper: MongoHelper;
  let email = "order_controller@gmail.com";
  let password = "test123";
  let accessToken: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const [fetchedUserId, fetchedAccessToken] = await signupUserAndGetToken(
      app,
      email,
      password
    );
    accessToken = fetchedAccessToken;
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createCategory() {
    const response = await request(app)
      .post("/api/v1/categories")
      .send({
        id: 1,
        name: "Test category",
        image: "Image",
      })
      .set("Authorization", "bearer " + accessToken);

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Test category");
    return response;
  }

  it("Should create a category", async () => {
    await createCategory();
  });

  it("should get the category", async () => {
    const categoryResponse = await createCategory();
    const categoryId = categoryResponse.body._id.toString();

    const response = await request(app).get("/api/v1/categories/" + categoryId);
  });

  it("should update the category", async () => {
    // update a category
    const categoryResponse = await createCategory();
    const categoryId = categoryResponse.body._id.toString();

    const response = await request(app)
      .put("/api/v1/categories/" + categoryId)
      .send({
        name: "Updated category",
      })
      .set("Authorization", "bearer " + accessToken);
    expect(response.body.name).toEqual("Updated category");
  });

  it("should delete the category", async () => {
    const categoryResponse = await createCategory();
    const categoryId = categoryResponse.body._id.toString();

    const response = await request(app)
      .delete("/api/v1/categories/" + categoryId)
      .set("Authorization", "bearer " + accessToken);
    expect(response.body._id).toEqual(categoryId);
  });
});
