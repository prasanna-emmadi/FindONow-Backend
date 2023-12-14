import OrderService from "../../src/services/orderService";
import userService from "../../src/services/userService";
import connect, { MongoHelper } from "../db-helper";

describe("Order controller", () => {
  let mongoHelper: MongoHelper;
  let userId: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const usrObj: any = {
      name: "Test cat",
      email: "testcat@testcat.com",
      password: "1234",
    };
    const user: any = await userService.createOne(usrObj);
    userId = user._id;
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  async function createOrder() {
    const order: any = {
      userId: userId,
      date: "2011-10-05T14:48:00.000Z",
      totalAmount: 100,
    };
    const newOrder = await OrderService.createOne(order);

    expect(newOrder).toHaveProperty("_id");
    expect(newOrder.totalAmount).toEqual(100);
    return newOrder;
  }

  it("should create a new order", async () => {
    await createOrder();
  });

  it("should update a new order", async () => {
    const createdOrder = await createOrder();

    const updatedorder: any = {
      userId: userId,
      date: createdOrder.date,
      totalAmount: 300,
    };

    const newOrder = await OrderService.updateOne(
      createdOrder._id.toString(),
      updatedorder
    );
    if (newOrder) {
      expect(newOrder).toHaveProperty("_id");
      expect(newOrder.totalAmount).toEqual(300);
    }
  });

  it("should delete a order", async () => {
    const createdOrder = await createOrder();
    const newOrder = await OrderService.deleteOne(createdOrder._id.toString());
    if (newOrder) {
      expect(newOrder).toHaveProperty("_id");
      expect(newOrder.totalAmount).toEqual(100);
    }
  });
});
