const taskModel = require("../models/taskModel");
exports.getTasks = (req, res) => {
  taskModel.getTasksByUser(req.user.id, (err, tasks) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching tasks" });
    }
    res.json(tasks);
  });
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  taskModel.createTask(req.user.id, title, description, (err, taskId) => {
    if (err) {
      return res.status(500).json({ message: "Error creating task" });
    }
    res.status(201).json({
      message: "Task created successfully",
      task: { id: taskId, title, description },
    });
  });
};

exports.deleteTask = (req, res) => {
  const taskId = req.params.id;

  taskModel.deleteTask(req.user.id, taskId, (err, success) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting task" });
    }
    if (!success) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  });
};
