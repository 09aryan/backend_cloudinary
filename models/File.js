const mongoose = require("mongoose");
const nodemailer=require("nodemailer");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: [String], // Change the type to an array of strings
  },
  email: {
    type: String,
  },
});

//post middleware
//doc->refetr to entry in database;
fileSchema.post("save",async function(doc){
    try{
         console.log("DOC",doc);
         //transpoter
         let transpoter=nodemailer.createTransport({
            host:process.env.MAIL_HOST, //MAIL SERVER
            auth:{
                user:process.env.MAIL_USER, //WHICH ID TO SEND MAIL
                pass:process.env.MAIL_PASS  //PASSWORD
            }
         });
         //SEND MAIl
         let info=await transpoter.sendMail({
            from:"codeHelp by Babbar",
            to:doc.email,
            subject:"MY file uploaded on cloudinary",
            html:'<h2>helloo jee</h2>view here: <a href="${doc.imageUrl}">image url</a>',
         })

        }
    catch(err){
         console.log(err,"err");
    }
})
const File = mongoose.model("File", fileSchema);

module.exports = File;
 