import ProductService from "../../src/services/productsService";
import connect, { MongoHelper } from "../db-helper";
import categoryService from "../../src/services/categoryService";

describe("Product service", () => {
  let mongoHelper: MongoHelper;
  // product is dependent on
  // category
  // create category
  let category: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    // create category
    const categoryObj: any = {
      id: 1,
      name: "test",
      image: "Image",
    };
    const categoryResponse: any = await categoryService.createOne(categoryObj);
    category = categoryResponse._id;
  });
  
  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
  // create new product
  async function createProduct() {
    const product: any = {
      name: "Test Product",
      description: "This is a test product.",
      price: 19.99,
      image: "test-image-url.jpg",
    };
    const newProduct = await ProductService.createOne(product, category);
    expect(newProduct).toHaveProperty("_id");
    expect(newProduct.name).toEqual("Test Product");
    expect(newProduct.description).toEqual("This is a test product.");
    expect(newProduct.price).toEqual(19.99);
    expect(newProduct.image).toEqual("test-image-url.jpg");
    return newProduct;
  }

  it("should create a new product", async () => {
    await createProduct();
  });

  it("should get one product", async () => {
    const product = await createProduct();
    const id = product._id.toString();
    const fetchedProduct = await ProductService.findOne(id);
    if (fetchedProduct) {
      const newId = fetchedProduct._id.toString();
      expect(newId).toBe(id);
    }
  });
  it("should update a new product", async () => {
    const product = await createProduct();
    const updatedproduct: any = {
      name: "Test Product",
      description: "This is a test product.",
      price: 19.99,
      image: "test-image-url.jpg",
    };
    const id = product._id.toString();
    const newProduct = await ProductService.updateOne(
      id,
      updatedproduct,
      category
    );
    if (newProduct) {
      expect(newProduct).toHaveProperty("_id");
      expect(newProduct.name).toEqual("Test Product");
      expect(newProduct.description).toEqual("This is a test product.");
      expect(newProduct.price).toEqual(19.99);
      expect(newProduct.image).toEqual("test-image-url.jpg");
    }
  });
  it("should delete a product", async () => {
    const product = await createProduct();
    const id = product._id.toString();
    const newProduct = await ProductService.deleteOne(id);
    if (newProduct) {
      expect(newProduct).toHaveProperty("_id");
      expect(newProduct.name).toEqual("Test Product");
      expect(newProduct.description).toEqual("This is a test product.");
      expect(newProduct.price).toEqual(19.99);
      expect(newProduct.image).toEqual("test-image-url.jpg");
    }
  });
});
