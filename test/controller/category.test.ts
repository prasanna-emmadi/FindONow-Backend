import request from "supertest";

import app from "../../";
import CategoryService from "../../services/categoryService";
import connect, { MongoHelper } from "../db-helper";

describe("Category controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    //mongoHelper = await connect();
  });

  afterEach(async () => {
    //await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
   // await mongoHelper.closeDatabase();
  });

  it("Should create a category", async () => {
    // const document = await CategoryService.createOne({ name: "new cat" });
    // console.log("document:", document);
    // expect(document).toHaveProperty("name");

    const response = await request(app).post("/api/v1/categories").send({
      name: "Test cat",
    });
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toMatchObject({ data: { name: "Test cat" } });
    expect(response.body.data).toEqual({
      data: {
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
    let category:any = {name: "NewCategory"}
    await CategoryService.createOne(category);

    const response = await request(app).get("/api/v1/categories");

    expect(response.body.data.length).toEqual(1);
    expect(response.body.data).toMatchObject({
      name: "NewCategory",
    });
  });
});
