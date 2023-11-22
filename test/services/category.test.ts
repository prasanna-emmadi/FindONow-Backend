import request from "supertest";

import app from "../../index.js";
import CategoryService from "../../services/categoryService.js";
import connect, { MongoHelper } from "../db-helper.js";
import CategoryRepo from "../../models/Category.js";

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

  it("should create a new category", async () => {
    // create new category
    const category = {
      id:0,
      name: "test",
    };
    const newCategory = await CategoryService.createOne(category);
    expect(newCategory).toHaveProperty("_id");
    expect(newCategory.name).toEqual("test");
  });

  it("should return a list", async () => {
    // create new category
    const newCategory = new CategoryRepo({
      name: "test",
    });

    await newCategory.save();

    // way1: use createOne()
    // way2: save()

    const categories = await CategoryService.findAll();
    expect(categories.length).toEqual(1);
    // check length
  });
});
