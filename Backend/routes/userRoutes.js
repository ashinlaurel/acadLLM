const express = require("express");
const { getAllUsers, getUserById } = require("../controllers/userController");
const router = express.Router();

router.get("/getAll", getAllUsers);
router.get("/getUserById", getUserById);

module.exports = router;
