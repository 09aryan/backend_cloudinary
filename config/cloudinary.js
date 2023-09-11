const cloudinary = require("cloudinary");

exports.cloudinaryConnect = () => {
  try {
    cloudinary.v2.config({
      cloud_name: 'dycjfvkno',
      api_key: '155367423744488',
      api_secret:'9Q207NuD_Saggw02sFjZQoniwks',
      secure: true,
    });
    console.log("Connected to Cloudinary successfully");
  } catch (err) {
    console.error("Error connecting to Cloudinary:", err);
  }
};
