import request from "supertest";
import app from "../../src";
import connect, { MongoHelper } from "../db-helper";

const PRODUCTS_URL = "/api/v1/products/";

describe("Product controller", () => {
  let mongoHelper: MongoHelper;
  let category: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const categoryObj: any = {
      id: 1,
      name: "category1",
      image: "Image",
    };
    const response = await request(app)
      .post("/api/v1/categories")
      .send(categoryObj);
    category = response.body._id.toString();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createProduct() {
    const response = await request(app)
      .post(PRODUCTS_URL)
      .send({
        title: "Smartphone",
        description: "High-end smartphone with advanced features",
        price: 799.99,
        images: ["https://example.com/smartphone.jpg"],
        category,
      });

    expect(response.body).toHaveProperty("title");
    expect(response.body.title).toEqual("Smartphone");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toEqual(
      "High-end smartphone with advanced features"
    );
    expect(response.body).toHaveProperty("price");
    expect(response.body.price).toEqual(799.99);
    expect(response.body).toHaveProperty("images");
    expect(response.body.images).toEqual([
      "https://example.com/smartphone.jpg",
    ]);
    expect(response.body).toHaveProperty("category");
    expect(response.body.category).toEqual(category);
    return response;
  }

  it("Should create a product", async () => {
    await createProduct();
  });

  it("Should get the product", async () => {
    const productResponse = await createProduct();
    const productId = productResponse.body._id.toString();
    const response = await request(app).get(PRODUCTS_URL + productId);

    expect(response.body).toHaveProperty("title");
    expect(response.body.title).toEqual("Smartphone");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toEqual(
      "High-end smartphone with advanced features"
    );
    expect(response.body).toHaveProperty("price");
    expect(response.body.price).toEqual(799.99);
    expect(response.body).toHaveProperty("images");
    expect(response.body.images).toEqual([
      "https://example.com/smartphone.jpg",
    ]);
    expect(response.body).toHaveProperty("category");
  });

  it("Should update the product", async () => {
    const productResponse = await createProduct();
    const productId = productResponse.body._id.toString();

    const response = await request(app)
      .put(PRODUCTS_URL + productId)
      .send({
        title: "Updated Smartphone",
        description: "Updated description for the smartphone",
        price: 899.99,
        images: ["https://example.com/updated-smartphone.jpg"],
        category: "655e9e08106158f8d895ccbe",
      });

    expect(response.body).toHaveProperty("title");
    expect(response.body.title).toEqual("Updated Smartphone");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toEqual(
      "Updated description for the smartphone"
    );
    expect(response.body).toHaveProperty("price");
    expect(response.body.price).toEqual(899.99);
    expect(response.body).toHaveProperty("images");
    expect(response.body.images).toEqual([
      "https://example.com/updated-smartphone.jpg",
    ]);
    expect(response.body).toHaveProperty("category");
  });

  it("Should delete the product", async () => {
    const productResponse = await createProduct();
    const productId = productResponse.body._id.toString();

    const response = await request(app).delete(PRODUCTS_URL + productId);

    const responseBody = JSON.parse(response.text);
    const message = responseBody.message;

    expect(responseBody).toHaveProperty("message");
    expect(message).toEqual("Product deleted successfully");
  });
});
