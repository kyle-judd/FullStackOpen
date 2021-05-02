const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helpers = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helpers.initialBlogs.map((blog) => new Blog(blog));
  const promiseArr = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArr);
});

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("All notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helpers.initialBlogs.length);
});

test("A specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain("HTML is easy");
});

test("A valid blog can be added", async () => {
  const newBlog = {
    title: "Testing in Node.js",
    author: "Kyle Judd",
    url: "http://www.KyleJuddDev.com/testingNodeJS",
    likes: 24,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const blogs = await helpers.blogsInDb();
  const titles = await helpers.getTitles();
  expect(blogs).toHaveLength(helpers.initialBlogs.length + 1);
  expect(titles).toContain("Testing in Node.js");
});

test("likes cannot be missing from blog object", async () => {
  const newBlog = {
    title: "Example",
    author: "example",
    url: "example",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helpers.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length);
});

test("title and url cannot be missing from blog object", async () => {
  const withOutTitleAndURL = {
    author: "example",
    likes: 24,
  };

  await api.post("/api/blogs").send(withOutTitleAndURL).expect(400);
  const blogsAtEnd = await helpers.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length);
});

test("blog id should be id and not _id", async () => {
  const blogs = await helpers.blogsInDb();
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("blog with valid id should be deleted", async () => {
  const blogsAtStart = await helpers.blogsInDb();
  console.log(blogsAtStart);
  const blogToBeDeleted = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);
  const blogsAtEnd = await helpers.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length - 1);
  const contents = blogsAtEnd.map((blog) => blog.title);
  expect(contents).not.toContain(blogToBeDeleted.title);
});

test("blogs likes will be updated successfully", async () => {
  const blogsAtStart = await helpers.blogsInDb();
  const blogToBeUpdated = blogsAtStart[0];
  const updatedBlog = {
    ...blogToBeUpdated,
    likes: 100,
  };
  await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200);
  const blogsAtEnd = await helpers.blogsInDb();
  const likes = blogsAtEnd.map((blog) => blog.likes);
  expect(likes).toContain(100);
});
afterAll(() => {
  mongoose.connection.close();
});
