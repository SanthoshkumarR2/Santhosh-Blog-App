const mongoose = require("mongoose");
const Blog = require("../model/Blog");
const User = require("../model/User");

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve blogs" });
  }
};

const addBlog = async (req, res, next) => {
  const { title, desc, img, user } = req.body;
  const currentDate = new Date();

  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const blog = new Blog({ title, desc, img, user, date: currentDate });

    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();

    return res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add blog" });
  }
};

const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, desc } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(blogId, { title, desc }, { new: true });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update blog" });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve blog" });
  }
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id).populate('user');
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const user = blog.user;
    user.blogs.pull(blog);
    await user.save();

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete blog" });
  }
};

const getByUserId = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userBlogs = await User.findById(userId).populate("blogs");
    if (!userBlogs) {
      return res.status(404).json({ message: "No blogs found for the user" });
    }
    return res.status(200).json({ user: userBlogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve user blogs" });
  }
};

module.exports = { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId };
