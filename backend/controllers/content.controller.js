import ContentModel from "../models/content.model.js";
import TagModel from "../models/tags.model.js";
import UserModel from "../models/user.model.js";

// Create new content
export const createContent = async (req, res) => {
  try {
    const { link, type, title, tags } = req.body;
    const userId = req.user.id;

    // Validate content type
    if (!['image', 'video', 'article', 'audio'].includes(type)) {
      return res.status(400).json({
        message: "Invalid content type",
        success: false
      });
    }

    // Process tags
    let tagIds = [];
    if (tags && tags.length > 0) {
      for (let tagTitle of tags) {
        // Find or create tag
        let tag = await TagModel.findOne({ title: tagTitle });
        if (!tag) {
          tag = await TagModel.create({ 
            title: tagTitle,
            usageCount: 1
          });
        } else {
          tag.usageCount += 1;
          await tag.save();
        }
        tagIds.push(tag._id);
      }
    }

    // Create content
    const content = await ContentModel.create({
      user: userId,
      link,
      type,
      title,
      tags: tagIds
    });

    // Add content to user's contents array
    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { contents: content._id } }
    );

    return res.status(201).json({
      message: "Content created successfully",
      content,
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

// Get all contents for a user
export const getUserContents = async (req, res) => {
  try {
    const userId = req.user.id;
    const contents = await ContentModel.find({ user: userId })
      .populate('tags', 'title')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      contents,
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

// Get content by ID
export const getContentById = async (req, res) => {
  try {
    const { contentId } = req.params;
    const content = await ContentModel.findById(contentId)
      .populate('tags', 'title')
      .populate('user', 'fullname email');

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
        success: false
      });
    }

    return res.status(200).json({
      content,
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

// Update content
export const updateContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { title, tags } = req.body;
    const userId = req.user.id;

    // Process new tags if provided
    let tagIds = [];
    if (tags && tags.length > 0) {
      for (let tagTitle of tags) {
        let tag = await TagModel.findOne({ title: tagTitle });
        if (!tag) {
          tag = await TagModel.create({ 
            title: tagTitle,
            usageCount: 1
          });
        } else {
          tag.usageCount += 1;
          await tag.save();
        }
        tagIds.push(tag._id);
      }
    }

    const content = await ContentModel.findOneAndUpdate(
      { _id: contentId, user: userId },
      { 
        $set: { 
          title,
          tags: tagIds
        }
      },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({
        message: "Content not found or unauthorized",
        success: false
      });
    }

    return res.status(200).json({
      message: "Content updated successfully",
      content,
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

// Delete content
export const deleteContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const userId = req.user.id;

    const content = await ContentModel.findOneAndDelete({ 
      _id: contentId,
      user: userId
    });

    if (!content) {
      return res.status(404).json({
        message: "Content not found or unauthorized",
        success: false
      });
    }

    // Remove content reference from user's contents array
    await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { contents: contentId } }
    );

    // Update tag usage counts
    if (content.tags.length > 0) {
      await TagModel.updateMany(
        { _id: { $in: content.tags } },
        { $inc: { usageCount: -1 } }
      );
    }

    return res.status(200).json({
      message: "Content deleted successfully",
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
