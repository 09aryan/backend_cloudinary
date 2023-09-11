const express = require("express");
const { localFileUpload, imageUpload } = require("../controllers/fileUpload");
const router = express.Router();

router.post("/localFileUpload", localFileUpload);

router.post("/imageUpload", imageUpload);
module.exports = router;
   