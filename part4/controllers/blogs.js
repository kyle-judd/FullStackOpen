const blogRouter = require("express").Router();
const { update } = require("../models/blog");
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.likes || !body.title || !body.url) {
    response
      .status(400)
      .json({ error: "Requires likes, title, and url to not be null" });
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

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    ...body,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
