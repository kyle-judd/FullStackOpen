const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Kyle Judd",
    url: "http://www.exampleurl.com/HTML_is_easy",
    likes: 3,
  },
  {
    title: "Browser can execute only Javascript",
    author: "Deep Toot",
    url: "http://www.exampleurl.com/browsercanexecuteonlyjavascript",
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getTitles = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.title);
};

module.exports = { initialBlogs, blogsInDb, getTitles };
