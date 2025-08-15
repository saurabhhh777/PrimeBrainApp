import BlogModel from "../models/blog.model.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, description, tags, image } = req.body;
    const author = req.user.id;

    if (!title || !content || !description) {
      return res.status(400).json({
        message: "Title, content, and description are required",
        success: false
      });
    }

    const blog = await BlogModel.create({
      title,
      content,
      description,
      author,
      tags: tags || [],
      image: image || "https://via.placeholder.com/300"
    });

    await blog.populate('author', 'fullname email');

    return res.status(201).json({
      message: "Blog created successfully",
      success: true,
      blog
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ published: true })
      .populate('author', 'fullname email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      blogs
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id)
      .populate('author', 'fullname email');

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false
      });
    }

    return res.status(200).json({
      success: true,
      blog
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, description, tags, image, published } = req.body;
    const author = req.user.id;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false
      });
    }

    // Check if user is the author
    if (blog.author.toString() !== author) {
      return res.status(403).json({
        message: "You can only update your own blogs",
        success: false
      });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, description, tags, image, published },
      { new: true }
    ).populate('author', 'fullname email');

    return res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      blog: updatedBlog
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const author = req.user.id;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false
      });
    }

    // Check if user is the author
    if (blog.author.toString() !== author) {
      return res.status(403).json({
        message: "You can only delete your own blogs",
        success: false
      });
    }

    await BlogModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Blog deleted successfully",
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Get user's blogs
export const getUserBlogs = async (req, res) => {
  try {
    const author = req.user.id;
    const blogs = await BlogModel.find({ author })
      .populate('author', 'fullname email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      blogs
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
}; 