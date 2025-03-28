import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import FacultySignup from './pages/FacultySignup';
import SignupChoice from './pages/SignupChoice';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Review from './pages/Review';
import { AuthProvider } from './context/AuthContext';
import List from './pages/List';
import Agreement from './pages/Agreement'
import StudentSignup from './pages/StudentSignup'
import Uploads from './pages/Uploads'
import Progress from'./pages/Progress'
import BatchReview from './pages/BatchReview'
import Marks from './pages/Marks'
import Announcements from './pages/Announce'
import AboutUs from './pages/Aboutus';
// import AttendanceReports from './pages/AttendanceReports'
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupChoice />} />
              <Route path="/signup/student" element={<StudentSignup />} />
              <Route path="/signup/faculty" element={<FacultySignup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/agreement" element={<Agreement />} />
              <Route path="/list" element={<List />} />
              <Route path="/uploads" element={<Uploads />} />
              <Route path="/review" element={<Review />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/batchreview" element={<BatchReview />} />
              <Route path="/marks" element={<Marks />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/marks" element={<Marks />} />
              {/* <Route path="/attendance" element={<AttendanceReports />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
