import request from "supertest";
import app from "../../src";
import connect, { MongoHelper } from "../db-helper";
import { signupUserAndGetToken } from "../login-helper";

const BASE_URL = "/api/v1";
const ORDERS_URL = BASE_URL + "/orders";
const CATEGORIES_URL = BASE_URL + "/categories";
const PRODUCTS_URL = BASE_URL + "/products";
const TEST_TIMEOUT = 20000;

describe("Order controller", () => {
  let mongoHelper: MongoHelper;
  let categoryId: string;
  let product: string;
  let email = "order_controller@gmail.com";
  let password = "test123";
  let accessToken: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    // create user
    const [_fetchedUserId, fetchedAccessToken] = await signupUserAndGetToken(
      app,
      email,
      password
    );
    accessToken = fetchedAccessToken;
    const categoryResponse = await request(app)
      .post(CATEGORIES_URL)
      .set("Authorization", "bearer " + accessToken)
      .send({
        name: " Test cat",
      })
      .set("Authorization", "bearer " + accessToken);
    expect(categoryResponse.statusCode).toBe(201);
    categoryId = categoryResponse.body._id;
    const productResponse = await request(app)
      .post(PRODUCTS_URL)
      .set("Authorization", "bearer " + accessToken)
      .send({
        title: " Test cat",
        description: "Animal",
        price: 10.2,
        images: ["google.com"],
        category: categoryId,
      });
    expect(productResponse.statusCode).toBe(201);
    product = productResponse.body._id;
  }, 60000);

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createOrder() {
    const response = await request(app)
      .post(ORDERS_URL)
      .send({
        date: "2011-10-05T14:48:00.000Z",
        totalAmount: 100,
        orderItems: [
          {
            product: product,
            quantity: 230,
            priceAtPurchase: 200,
          },
        ],
      })
      .set("Authorization", "bearer " + accessToken);
    expect(response.statusCode).toBe(201);
    return response;
  }

  it(
    "Should create a order",
    async () => {
      await createOrder();
    },
    TEST_TIMEOUT
  );

  it(
    "should get the order",
    async () => {
      const response = await createOrder();
      const orderId = response.body._id;
      const singleResponse = await request(app)
        .get(ORDERS_URL + "/" + orderId)
        .set("Authorization", "bearer " + accessToken);

      expect(singleResponse.body._id).toEqual(orderId);
    },
    TEST_TIMEOUT
  );

  it(
    "should get all user orders",
    async () => {
      const response = await createOrder();
      const orderId = response.body._id;
      const orderResponse = await request(app)
        .get(ORDERS_URL)
        .set("Authorization", "bearer " + accessToken);
      expect(orderResponse.body.length).toEqual(3);
      expect(orderResponse.body[2]._id).toEqual(orderId);
    },
    TEST_TIMEOUT
  );

  it(
    "should update the order",
    async () => {
      // update a category
      // create order
      // update
      // get and check
      const response = await createOrder();
      const orderId = response.body._id;
      const putResponse = await request(app)
        .put(ORDERS_URL + "/" + orderId)
        .send({
          date: "2011-10-05T14:48:00.000Z",
          totalAmount: 120,
          orderItems: [],
        })
        .set("Authorization", "bearer " + accessToken);
      expect(putResponse.body.totalAmount).toEqual(120);
    },
    TEST_TIMEOUT
  );

  it(
    "should delete the order",
    async () => {
      // create order
      // delete order
      // get and check
      const response = await createOrder();
      const orderId = response.body._id;
      const deleteResponse = await request(app)
        .delete(ORDERS_URL + "/" + orderId)
        .set("Authorization", "bearer " + accessToken);
      expect(deleteResponse.body._id).toEqual(orderId);
    },
    TEST_TIMEOUT
  );
});
