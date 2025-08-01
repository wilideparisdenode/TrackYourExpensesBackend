const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://wilofo:6700128392020wil@cluster0.laojzec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Define the user schema (matching your model)
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const userData = {
      name: "wilofo",
      email: "wilofo@gmail.com",
      password: "670012839",
      isAdmin: true
    };

    // Check if user already exists
    const existing = await User.findOne({ email: userData.email });
    if (existing) {
      console.log('User already exists:', existing);
    } else {
      const user = await User.create(userData);
      console.log('Admin user created:', user);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

createAdminUser();