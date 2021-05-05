const Blog = require("../models/blog");
const User = require("../models/user");

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

const getUsers = async (type) => {
  const allUsers = await User.find({});
  let user;
  if (type === "fresh") {
    user = {
      username: "JESTFRESHUSER",
      name: "JEST USER",
      password: "JESTPASSWORD",
    };
  } else if (type === "exists") {
    user = {
      username: "root",
      name: "Exist Name",
      password: "EXISTPASSWORD",
    };
  } else if (type === "username") {
    user = {
      username: "sm",
      name: "Small User",
      password: "SMALLPASSWORD",
    };
  } else if (type === "password") {
    user = {
      username: "test",
      name: "test name",
      password: "tw",
    };
  }
  return [allUsers, user];
};

module.exports = { initialBlogs, blogsInDb, getTitles, getUsers };
