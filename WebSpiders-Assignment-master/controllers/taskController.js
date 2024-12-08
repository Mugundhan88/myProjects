const jwt = require('jsonwebtoken')
const Task = require('../models/Task');
const User = require('../models/User')
const bcrypt = require('bcrypt'); 

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "Invalid  password" });
        }

        const payload = { username: user.username, id: user._id };
        const jwtToken = jwt.sign(payload, process.env.MY_SECRET_CODE);

        res.status(200).json({ token: jwtToken, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

exports.createTask = async (req, res, next) => {
  try {
    const taskData = req.body;
    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};


exports.getTasks = async (req, res, next) => {
  try {
    const { status, priority, sort, limit = 20, skip = 0 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
      .sort(sort === 'dueDate' ? { dueDate: 1 } : { createdAt: 1 })
      .skip(Number(skip))
      .limit(Number(limit));

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};


exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};


exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
