import LinkModel from "../models/link.model.js";

// Create new link
export const createLink = async (req, res) => {
  try {
    const { hash } = req.body;
    const userId = req.user.id;

    const link = await LinkModel.create({
      user: userId,
      hash
    });

    return res.status(201).json({
      message: "Link created successfully",
      success: true,
      link
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later", 
      success: false
    });
  }
};

// Get link by hash
export const getLinkByHash = async (req, res) => {
  try {
    const { hash } = req.params;

    const link = await LinkModel.findOne({ hash });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
        success: false
      });
    }

    return res.status(200).json({
      success: true,
      link
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false
    });
  }
};

// Delete link
export const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const userId = req.user.id;

    const link = await LinkModel.findOneAndDelete({
      _id: linkId,
      user: userId
    });

    if (!link) {
      return res.status(404).json({
        message: "Link not found or unauthorized",
        success: false
      });
    }

    return res.status(200).json({
      message: "Link deleted successfully",
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
