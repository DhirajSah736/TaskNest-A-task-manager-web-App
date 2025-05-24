import { User } from '../models/User.js';

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    // Update user fields
    if (name) user.name = name;
    if (email) {
      // Check if email is already taken
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== req.user._id.toString()) {
        res.status(400);
        throw new Error('Email already in use');
      }
      user.email = email;
    }
    
    const updatedUser = await user.save();
    
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};