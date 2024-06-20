const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST route to create a new student
router.post('/', async (req, res) => {
  const { name, email, hostel, room } = req.body;
  try {
    const student = new Student({ name, email, hostel, room });
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to search students by name
router.get('/search/name', async (req, res) => {
  const { name } = req.query;
  try {
    const students = await Student.find({ name: new RegExp(name, 'i') });
    res.send(students);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to search students by hostel and room
router.get('/search/hostel', async (req, res) => {
  const { hostel, room } = req.query;
  try {
    const students = await Student.find({ hostel, room });
    res.send(students);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;