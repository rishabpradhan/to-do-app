const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const taskController = require("../controller/taskController");

router.use(protect);

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
