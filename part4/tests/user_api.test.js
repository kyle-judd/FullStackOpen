const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const helpers = require("../utils/test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("creation succeeds with a fresh username and correct format", async () => {
    const [usersAtStart, freshUser] = await helpers.getUsers("fresh");

    await api
      .post("/api/users")
      .send(freshUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const [usersAtEnd, user] = await helpers.getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(freshUser.username);
  });

  test("creating fails with proper status code if username already exists", async () => {
    const [usersAtStart, existingUser] = await helpers.getUsers("exists");
    const result = await api
      .post("/api/users")
      .send(existingUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const [usersAtEnd, user] = await helpers.getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("The user is invalid", () => {
  test("if the password is less than 3 characters", async () => {
    const [usersAtStart, invalidUser] = await helpers.getUsers("password");

    const res = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(res.body.error).toContain(
      "password must be 3 at least 3 characters long"
    );
    const [usersAtEnd, user] = await helpers.getUsers();
    console.log(usersAtEnd);
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creating user fails if username isnt 3 characters long", async () => {
    const [usersAtStart, invalidUser] = await helpers.getUsers("username");

    const res = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(res.body.error).toContain("User validation failed");
    const [usersAtEnd, user] = await helpers.getUsers();
    console.log(usersAtEnd);
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
