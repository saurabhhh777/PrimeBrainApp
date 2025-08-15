import SocialLinkModel from "../models/socialLink.model.js";
import TagModel from "../models/tags.model.js";

// Create or update a social link
export const createOrUpdateSocialLink = async (req, res) => {
  try {
    const { platform, url, title, description, tags } = req.body;
    const user = req.user.id;

    if (!platform || !url) {
      return res.status(400).json({
        message: "Platform and URL are required",
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

    // Check if link already exists for this user and platform
    const existingLink = await SocialLinkModel.findOne({ user, platform });

    if (existingLink) {
      // Update existing link
      const updatedLink = await SocialLinkModel.findByIdAndUpdate(
        existingLink._id,
        { url, title, description, tags: tagIds },
        { new: true }
      );

      return res.status(200).json({
        message: "Social link updated successfully",
        success: true,
        link: updatedLink
      });
    } else {
      // Create new link
      const newLink = await SocialLinkModel.create({
        user,
        platform,
        url,
        title,
        description,
        tags: tagIds
      });

      return res.status(201).json({
        message: "Social link created successfully",
        success: true,
        link: newLink
      });
    }

  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A link for this platform already exists",
        success: false
      });
    }
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Get all social links for a user
export const getUserSocialLinks = async (req, res) => {
  try {
    const user = req.user.id;
    const links = await SocialLinkModel.find({ user, active: true }).populate('tags');

    return res.status(200).json({
      success: true,
      links
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Get social links by user ID (public)
export const getSocialLinksByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const links = await SocialLinkModel.find({ user: userId, active: true });

    return res.status(200).json({
      success: true,
      links
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Delete a social link
export const deleteSocialLink = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const link = await SocialLinkModel.findById(id);

    if (!link) {
      return res.status(404).json({
        message: "Social link not found",
        success: false
      });
    }

    if (link.user.toString() !== user) {
      return res.status(403).json({
        message: "You can only delete your own social links",
        success: false
      });
    }

    await SocialLinkModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Social link deleted successfully",
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

// Toggle social link active status
export const toggleSocialLink = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const link = await SocialLinkModel.findById(id);

    if (!link) {
      return res.status(404).json({
        message: "Social link not found",
        success: false
      });
    }

    if (link.user.toString() !== user) {
      return res.status(403).json({
        message: "You can only modify your own social links",
        success: false
      });
    }

    const updatedLink = await SocialLinkModel.findByIdAndUpdate(
      id,
      { active: !link.active },
      { new: true }
    );

    return res.status(200).json({
      message: `Social link ${updatedLink.active ? 'activated' : 'deactivated'} successfully`,
      success: true,
      link: updatedLink
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
}; 