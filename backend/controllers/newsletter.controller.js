import NewsletterModel from "../models/newsletter.model.js";
import nodemailer from "nodemailer";

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
};

// Send welcome email to new subscriber
const sendWelcomeEmail = async (email) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to PrimeBrain Newsletter! 🧠",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to PrimeBrain! 🧠</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your journey to better content management starts here</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #333; margin-top: 0;">Thank you for subscribing! 🎉</h2>
            <p style="color: #666; line-height: 1.6;">
              We're excited to have you on board! You'll now receive updates about:
            </p>
            <ul style="color: #666; line-height: 1.6;">
              <li>✨ New features and improvements</li>
              <li>📚 Tips and tricks for better content management</li>
              <li>🚀 Latest updates and announcements</li>
              <li>💡 Best practices for organizing your digital content</li>
            </ul>
            
            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1976d2; margin-top: 0;">What's Next?</h3>
              <p style="color: #424242; margin-bottom: 15px;">
                Start exploring PrimeBrain's features:
              </p>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <span style="background: #1976d2; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">📝 Articles</span>
                <span style="background: #1976d2; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">🐦 Tweets</span>
                <span style="background: #1976d2; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">📺 Videos</span>
                <span style="background: #1976d2; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">📚 Blogs</span>
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              If you have any questions or suggestions, feel free to reach out to us at 
              <a href="mailto:saurabhhhere@gmail.com" style="color: #1976d2;">saurabhhhere@gmail.com</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 10px;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              Best regards,<br>
              <strong>The PrimeBrain Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if email already exists
    const existingSubscriber = await NewsletterModel.findOne({ email: email.toLowerCase() });

    if (existingSubscriber) {
      if (existingSubscriber.isSubscribed) {
        return res.status(400).json({
          success: false,
          message: "You are already subscribed to our newsletter!",
        });
      } else {
        // Re-subscribe
        existingSubscriber.isSubscribed = true;
        existingSubscriber.unsubscribedAt = null;
        await existingSubscriber.save();
        
        // Send welcome back email
        await sendWelcomeEmail(email);
        
        return res.status(200).json({
          success: true,
          message: "Welcome back! You have been re-subscribed to our newsletter.",
        });
      }
    }

    // Create new subscriber
    const newSubscriber = await NewsletterModel.create({
      email: email.toLowerCase(),
    });

    // Send welcome email
    await sendWelcomeEmail(email);

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter! Check your email for a welcome message.",
      subscriber: {
        id: newSubscriber._id,
        email: newSubscriber.email,
        subscribedAt: newSubscriber.subscribedAt,
      },
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const subscriber = await NewsletterModel.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Email not found in our newsletter list",
      });
    }

    if (!subscriber.isSubscribed) {
      return res.status(400).json({
        success: false,
        message: "You are already unsubscribed from our newsletter",
      });
    }

    subscriber.isSubscribed = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: "Successfully unsubscribed from newsletter",
    });
  } catch (error) {
    console.error("Newsletter unsubscription error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all subscribers (admin only)
export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterModel.find({ isSubscribed: true })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Send newsletter to all subscribers (admin only)
export const sendNewsletter = async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({
        success: false,
        message: "Subject and content are required",
      });
    }

    const subscribers = await NewsletterModel.find({ isSubscribed: true });
    
    if (subscribers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active subscribers found",
      });
    }

    const transporter = createTransporter();
    let successCount = 0;
    let failureCount = 0;

    for (const subscriber of subscribers) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: subscriber.email,
          subject: subject,
          html: content,
        };

        await transporter.sendMail(mailOptions);
        successCount++;
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error);
        failureCount++;
      }
    }

    res.status(200).json({
      success: true,
      message: `Newsletter sent successfully! ${successCount} emails sent, ${failureCount} failed.`,
      stats: {
        total: subscribers.length,
        success: successCount,
        failure: failureCount,
      },
    });
  } catch (error) {
    console.error("Send newsletter error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}; 