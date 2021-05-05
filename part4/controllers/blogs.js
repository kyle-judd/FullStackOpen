const blogRouter = require("express").Router();
const { update } = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!request.token) {
    return response.status(401).json({ error: "Token is missing or invalid" });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  console.log(request.token);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  if (!body.likes || !body.title || !body.url) {
    response
      .status(400)
      .json({ error: "Requires likes, title, and url to not be null" });
  } else {
    try {
      const user = await User.findById(decodedToken.id);
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
      });
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);
    if (user.id === blog.user.id) {
      await Blog.findByIdAndRemove(blog.id);
      return res.status(204);
    }
    return response
      .status(401)
      .json({ error: "You cannnot delete that, resource not yours" });
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
