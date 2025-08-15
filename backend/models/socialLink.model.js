import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['twitter', 'youtube', 'reddit', 'instagram', 'linkedin', 'github', 'facebook', 'tiktok']
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure one link per platform per user
socialLinkSchema.index({ user: 1, platform: 1 }, { unique: true });

const SocialLinkModel = mongoose.model('SocialLink', socialLinkSchema);

export default SocialLinkModel; 