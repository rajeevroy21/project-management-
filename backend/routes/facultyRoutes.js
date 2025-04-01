const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty'); // Adjust the path as needed

const router = express.Router();

// Create a new faculty
router.post('/', async (req, res) => {
    try {
        const { facultyId, password, role } = req.body;

        if (!facultyId || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if faculty already exists
        const existingFaculty = await Faculty.findOne({ facultyId });
        if (existingFaculty) {
            return res.status(400).json({ error: 'Faculty ID already exists' });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newFaculty = new Faculty({ facultyId, password: hashedPassword, role });
        await newFaculty.save();

        res.status(201).json({ message: 'Faculty created successfully', facultyId, role });
    } catch (error) {
        console.error('Error creating faculty:', error);
        res.status(500).json({ error: 'Server error while creating faculty' });
    }
});

// Login faculty (authenticate)
router.post('/login', async (req, res) => {
    try {
        const { facultyId, password } = req.body;

        if (!facultyId || !password) {
            return res.status(400).json({ error: 'Faculty ID and password are required' });
        }

        // Find faculty by ID
        const faculty = await Faculty.findOne({ facultyId });
        if (!faculty) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { facultyId: faculty.facultyId, role: faculty.role, id: faculty._id },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '1h' }
        );
         alert("connected");
        console.log(`Faculty ${facultyId} logged in successfully`);

        // Send token and faculty details in response
        res.status(200).json({
            message: 'Login successful',
            token,
            faculty: { facultyId: faculty.facultyId, role: faculty.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});
router.get('/role/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Query the database for the user by userId
      const faculty = await Faculty.findOne({ facultyId: userId });
  
      if (!faculty) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the role
      res.json({ role: faculty.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
// Get all faculties
router.get('/', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single faculty by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const faculty = await Faculty.findById(id);
        if (!faculty) return res.status(404).json({ error: 'Faculty not found' });
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a faculty by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFaculty = await Faculty.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedFaculty) return res.status(404).json({ error: 'Faculty not found' });
        res.status(200).json(updatedFaculty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a faculty by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        if (!deletedFaculty) return res.status(404).json({ error: 'Faculty not found' });
        res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; // Export using CommonJS
