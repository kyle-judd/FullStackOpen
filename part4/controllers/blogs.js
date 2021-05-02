const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.likes) {
    response.status(400).json({ error: "Likes Cannot Be Empty" });
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    });
    try {
      const savedBlog = await blog.save();
      response.json(savedBlog);
    } catch (exception) {
      next(exception);
    }
  }
});

module.exports = blogRouter;
