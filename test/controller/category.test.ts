import request from "supertest";

import app from "../../index.js";
import CategoryService from "../../services/categoryService.js";
import connect, { MongoHelper } from "../db-helper.js";

describe("Category controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("Should create a category", async () => {
    // const document = await CategoryService.createOne({ name: "new cat" });
    // console.log("document:", document);
    // expect(document).toHaveProperty("name");

    const response = await request(app).post("/api/v1/categories").send({
      name: "Test cat",
    });
    expect(response.body.category).toHaveProperty("name");
    expect(response.body).toMatchObject({ category: { name: "Test cat" } });
    expect(response.body).toEqual({
      category: {
        name: "Test cat",
        __v: expect.any(Number),
        _id: expect.any(String),
      },
    });
  });

  // it("should not create new category");

  // find all category
  it("should return all category", async () => {
    // create a category
    await CategoryService.createOne({ id:1, name: "category1" });

    const response = await request(app).get("/api/v1/categories");

    expect(response.body.categories.length).toEqual(1);
    expect(response.body.categories[0]).toMatchObject({
      name: "category1",
    });
  });
});
