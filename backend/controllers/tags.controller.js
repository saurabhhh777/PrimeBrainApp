import TagModel from "../models/tag.model.js";

// Create new tag
export const createTag = async (req, res) => {
  try {
    const { title } = req.body;

    const existingTag = await TagModel.findOne({ title });
    if (existingTag) {
      return res.status(400).json({
        message: "Tag already exists",
        success: false
      });
    }

    const tag = await TagModel.create({
      title
    });

    return res.status(201).json({
      message: "Tag created successfully",
      success: true,
      tag
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Get all tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find().sort({ usageCount: -1 });

    return res.status(200).json({
      success: true,
      tags
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Get tag by id
export const getTagById = async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await TagModel.findById(tagId).populate('contents');

    if (!tag) {
      return res.status(404).json({
        message: "Tag not found",
        success: false
      });
    }

    return res.status(200).json({
      success: true,
      tag
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Update tag
export const updateTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { title } = req.body;

    // Check if new title already exists
    const existingTag = await TagModel.findOne({ 
      title,
      _id: { $ne: tagId }
    });

    if (existingTag) {
      return res.status(400).json({
        message: "Tag with this title already exists",
        success: false
      });
    }

    const tag = await TagModel.findByIdAndUpdate(
      tagId,
      { title },
      { new: true }
    );

    if (!tag) {
      return res.status(404).json({
        message: "Tag not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Tag updated successfully",
      success: true,
      tag
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Delete tag
export const deleteTag = async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await TagModel.findById(tagId);

    if (!tag) {
      return res.status(404).json({
        message: "Tag not found",
        success: false
      });
    }

    // Check if tag is being used
    if (tag.usageCount > 0) {
      return res.status(400).json({
        message: "Cannot delete tag that is currently in use",
        success: false
      });
    }

    await tag.deleteOne();

    return res.status(200).json({
      message: "Tag deleted successfully",
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
