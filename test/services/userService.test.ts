import UserService from "../../src/services/userService";
import connect, { MongoHelper } from "../db-helper";
import UserRepo from "../../src/models/User";

describe("User service", () => {
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

  async function createUser(emailPrefix: string) {
    const email = emailPrefix + "@gmail.com";
    const user: any = {
      name: "Test user",
      email: email,
      password: "test123",
      role: "User",
    };
    const newUser = await UserService.createOne(user);

    expect(newUser).toHaveProperty("_id");
    expect(newUser.name).toEqual("Test user");
    expect(newUser.email).toEqual(email);
    return newUser;
  }

  it("should create a new User", async () => {
    await createUser("create");
  });

  it("should update a User", async () => {
    // create new User
    const createdUser = await createUser("update");

    // update new user
    const user: any = {
      name: "Updated user",
      email: "update@gmail.com",
      password: "test123",
      role: "User",
    };
    const newUser = await UserService.findOneAndUpdate(
      createdUser._id.toString(),
      user
    );
    if (newUser) {
      expect(newUser).toHaveProperty("_id");
      expect(newUser.name).toEqual("Updated user");
      expect(newUser.email).toEqual("update@gmail.com");
    }
  });

  it("should delete a user", async () => {
    const createdUser = await createUser("delete");
    const deleteUser = await UserService.findOneAndDelete(
      createdUser._id.toString()
    );
    expect(deleteUser).toHaveProperty("_id");
    expect(deleteUser).toHaveProperty("name", "Test user");
  });
});
