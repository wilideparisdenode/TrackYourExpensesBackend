const user = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{ cloudinary}=require("../utils/cloudinary")

// Get all users
async function getAlluser(req, res) {
  try {
    const users = await user.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function createNewuser(req, res) {
  let { name, email, password, isAdmin } = req.body;
  const salt = 10;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.send("user already exist");
    }
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).send(err);
      const newUser = new user({ name, email, password: hash, isAdmin });
      await newUser.save();
      res.send(newUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// Update user
async function updateUser(req, res) {
  let { name, email, password } = req.body;
  let id = req.params.id;
  try {
    const updated = await user.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    if (updated) {
      return res.status(202).send(updated);
    }
    return res.status(404).send("the user was not found");
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete user
async function deleteUser(req, res) {
  let id = req.params.id;
  try {
    const deleted = await user.findByIdAndDelete(id);
    if (deleted) {
      res.status(202).send("user deleted successfully");
    } else {
      res.status(404).send("user not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Login
async function login(req, res) {
  try {
    let { email, password } = req.body;

    let User = await user.findOne({ email });
    if (User) {
      const match = await bcrypt.compare(password, User.password);
      if (match) {
        let token = jwt.sign({ id: User._id }, process.env.secretkey, { expiresIn: "1d" });
        return res.send({ User, token });
        
      } else {
        return res.status(401).send("Incorrect password");
      }
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}


async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const email = req.user.email;

    // Find user by email
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, User.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    User.password = hashedPassword;
    await User.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

const updatePersonalInfo = async (req, res) => {
  try {
    const { name, email } = req.body;
    const id = req.user._id;
    
    console.log("Uploaded file:", req.file); // Changed from req.files.file to req.file
    console.log("Request body:", req.body); // Add this to debug

    // Find user by id
    const userDoc = await user.findById(id);
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update basic fields
    if (name) userDoc.name = name;
    if (email) userDoc.email = email;

    // If a file was uploaded, handle Cloudinary upload
    if (req.file) {
      console.log("File details:", {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "user_profile",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(req.file.buffer); // Changed from req.files.file.buffer to req.file.buffer
      });

      const result = await uploadPromise;
      userDoc.profileImage = result.secure_url;
      console.log("Cloudinary URL:", result.secure_url);
    }

    const updatedUser = await userDoc.save();
    return res.status(200).json({
      message: "Personal information updated successfully",
      user: updatedUser
    });

  } catch (err) {
    console.error("Error in updatePersonalInfo:", err);
    return res.status(500).json({ message: "Server error: " + err.message });
  }
};


module.exports = {
  updatePersonalInfo,
  changePassword,
  getAlluser,
  createNewuser,
  updateUser,
  deleteUser,
  login,
};