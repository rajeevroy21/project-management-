const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const batchRoutes = require('./routes/batchRoutes.js');
const facultyRoutes = require('./routes/facultyRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const uploadRoutes=require('./routes/uploads.js')
const domainFacultyRoutes = require('./routes/domainFacultyRoutes');
const finalRoutes = require('./routes/finalRoutes');
const allocRoutes = require('./routes/allocRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const titleRoutes = require('./routes/TitleRoutes');
const secAllocRoutes = require('./routes/secAllocRoutes');
const attendanceRoutes = require("./routes/attendanceRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: "https://project-management-lake-zeta.vercel.app", 
    credentials: true
  }));
// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Use Routes
app.use('/api/batches', batchRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/uploads',uploadRoutes);
app.use('/api/domain-faculty', domainFacultyRoutes);
app.use('/api/final', finalRoutes);
app.use('/api/alloc', allocRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/update', titleRoutes);
app.use('/api/section', secAllocRoutes);
app.use("/api/attendance", attendanceRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});