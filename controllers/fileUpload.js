const File = require("../models/File");
const cloudinary = require("cloudinary").v2; // Import cloudinary.v2

// Configure Cloudinary (make sure to replace with your actual cloudinary configuration)
// cloudinary.config({
//   cloud_name: "your_cloud_name",
//   api_key: "your_api_key",
//   api_secret: "your_api_secret",
// });

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("File RECEIVED ->", file);
    const fileExtension = file.name.split('.').pop();
    let path = __dirname + "/files/" + Date.now() + fileExtension;
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};

 // Import the cloudinary library

//  const cloudinary = require("cloudinary").v2; // Import the cloudinary library

 function isFileTypeSupported(type, supportedTypes) {
   return supportedTypes.includes(type);
 }
 
 async function uploadFileToCloudinary(file, folder) {
   const options = { folder };
 return await cloudinary.uploader.upload(file.tempFilePath, options); // Use cloudinary.uploader.upload
 
 }
 
 exports.imageUpload = async (req, res) => {
   try {
     const { name, tags, email } = req.body; // Corrected 'email' to 'mail'
     console.log(name, tags, email); // Corrected 'email' to 'mail'
     const file = req.files.imageFile; // Corrected 'image' to 'imageFile'
     console.log(file);
 
     const supportedTypes = ["jpg", "jpeg", "png"];
     const fileType = file.name.split('.')[1].toLowerCase();
 
     if (!isFileTypeSupported(fileType, supportedTypes)) {
       return res.status(400).json({
         success: false,
         message: "File format not supported",
       });
     }
   //name change into cloudiNARY;
     // File format supported, upload to Cloudinary
     const response = await uploadFileToCloudinary(file, "learn");
     console.log(response);
     const fileData=await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
     })
 
     res.json({
       success: true,
       message: "Image Successfully  Uploaded",
     });
   } catch (err) {
     console.error(err);
     res.status(400).json({
       success: false,
       message: "Something went wrong",
     });
   }
 };
 