const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require("config");
const {Worker} = require("./models/Worker") ; 

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.get("mongoDB.MONGO_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if admin user already exists
    const existingAdmin = await Worker.findOne({ workerNum:1 });

    if (!existingAdmin) {
      // Hash the password
      const admin = {
        name:"israel",
        phone:"0543331122",
        workerNum:1,
        password:"12345678",
        status:"Admin"
    }
      admin.password = await bcrypt.hash(admin.password,12);

      // Create the admin user
      const adminUser = new Worker(admin);
    console.log(adminUser)
      // Save the admin user to the database
      await adminUser.save();

      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}

// Run the seedAdmin function
seedAdmin();