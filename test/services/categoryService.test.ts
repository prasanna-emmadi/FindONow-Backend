import CategoryService from "../../src/services/categoryService";
import connect, { MongoHelper } from "../db-helper";

describe("Category controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });
  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
  async function createCategory() {
    const category: any = {
      name: "test",
      id: 1,
      image: "Image",
    };
    const newCategory = await CategoryService.createOne(category);
    expect(newCategory).toHaveProperty("_id");
    expect(newCategory.id).toEqual(1);
    expect(newCategory.name).toEqual("test");
    expect(newCategory.image).toEqual("Image");
    return newCategory;
  }
  it("should create a new category", async () => {
    await createCategory();
  });

  it("should get one category", async () => {
    const category = await createCategory();
    const id = category._id.toString();
    const fetchedCategory = await CategoryService.findOne(id);
    if (fetchedCategory) {
      const newId = fetchedCategory._id.toString();
      expect(newId).toBe(id);
    }
  });
  it("should update a new category", async () => {
    const category = await createCategory();
    const updatedcategory: any = {
      name: "test",
    };
    const id = category._id.toString();
    const newCategory = await CategoryService.updateOne(id, updatedcategory);
    if (newCategory) {
      expect(newCategory).toHaveProperty("_id");
      expect(newCategory.name).toEqual("test");
    }
  });
  it("should delete a category", async () => {
    const category = await createCategory();
    const id = category._id.toString();
    const newCategory = await CategoryService.deleteOne(id);
    if (newCategory) {
      expect(newCategory).toHaveProperty("_id");
      expect(newCategory.name).toEqual("test");
    }
  });
});
