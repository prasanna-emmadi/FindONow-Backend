import request from "supertest";
import app from "../../src";
import connect, { MongoHelper } from "../db-helper";

describe("Product controller", () => {
  let mongoHelper: MongoHelper;
  let categoryId: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const categoryObj: any = {
      name: "category1",
    };
    const response = await request(app)
      .post("/api/v1/categories")
      .send(categoryObj);
    categoryId = response.body._id.toString();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createProduct() {
    const response = await request(app).post("/api/v1/products").send({
      name: "Smartphone",
      description: "High-end smartphone with advanced features",
      price: 799.99,
      image: "https://example.com/smartphone.jpg",
      categoryId,
    });

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Smartphone");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toEqual(
      "High-end smartphone with advanced features",
    );
    expect(response.body).toHaveProperty("price");
    expect(response.body.price).toEqual(799.99);
    expect(response.body).toHaveProperty("image");
    expect(response.body.image).toEqual("https://example.com/smartphone.jpg");
    expect(response.body).toHaveProperty("categoryId");
    expect(response.body.categoryId).toEqual(categoryId);
    return response;
  }

  it("Should create a product", async () => {
    await createProduct();
  });

  it("Should get the product", async () => {
    const productResponse = await createProduct();
    const productId = productResponse.body._id.toString();
    const response = await request(app).get("/api/v1/products/" + productId);

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Smartphone");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toEqual(
      "High-end smartphone with advanced features",
    );
    expect(response.body).toHaveProperty("price");
    expect(response.body.price).toEqual(799.99);
    expect(response.body).toHaveProperty("image");
    expect(response.body.image).toEqual("https://example.com/smartphone.jpg");
    expect(response.body).toHaveProperty("categoryId");
  });

  it("Should update the product", async () => {
    const productResponse = await createProduct();
    const productId = productResponse.body._id.toString();

    const response = await request(app)
      .put("/api/v1/products/" + productId)
      .send({
        name: "Updated Smartphone",
        description: "Updated description for the smartphone",
        price: 899.99,
        image: "https://example.com/updated-smartphone.jpg",
        categoryId: "655e9e08106158f8d895ccbe",
      });

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Updated Smartphone");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toEqual(
      "Updated description for the smartphone",
    );
    expect(response.body).toHaveProperty("price");
    expect(response.body.price).toEqual(899.99);
    expect(response.body).toHaveProperty("image");
    expect(response.body.image).toEqual(
      "https://example.com/updated-smartphone.jpg",
    );
    expect(response.body).toHaveProperty("categoryId");
  });

  it("Should delete the product", async () => {
    const productResponse = await createProduct();
    const productId = productResponse.body._id.toString();

    const response = await request(app).delete("/api/v1/products/" + productId);

    const responseBody = JSON.parse(response.text);
    const message = responseBody.message;

    expect(responseBody).toHaveProperty("message");
    expect(message).toEqual("Product deleted successfully");
  });
});
