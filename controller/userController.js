const user = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVerificationCode = require("./sendVerificationEmail");

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
      const newUser = new user({ name, email, password: hash, isAdmin }); // <-- include isAdmin here
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

module.exports = {
  getAlluser,
  createNewuser,
  updateUser,
  deleteUser,
  login,
};