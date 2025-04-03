const express = require("express");
const router = express.Router();
const { uploadImage, getImages } = require("../controllers/imageController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router.post("/", upload.single("image"), uploadImage);
router.get("/", getImages);
module.exports = router;
