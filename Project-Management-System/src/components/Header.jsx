import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home as HomeIcon, 
  LineChart, 
  Award, 
  Bell, 
  Info,
  LogIn,
  UserPlus,
  Upload,
  List,
  Menu,
  X
} from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole')); // Track user role

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []); // Runs on component mount

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    setUserRole(null); // Update state after logout
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-[#46c5e5] via-[#6D28D9] to-[#9333EA] text-white shadow-lg relative">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <button 
          className="md:hidden p-2 rounded-md hover:bg-purple-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="flex items-center space-x-2">
          <img src="/Images/idea.png" alt="Idea Icon" className="h-12 w-12" />
          <span className="font-bold text-xl text-[#090518]">
            Project <span className="text-[#f5f4f2]">Portal</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 text-white">
            <HomeIcon className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/progress" className="flex items-center space-x-1 text-white">
            <LineChart className="h-4 w-4" />
            <span>Track Progress</span>
          </Link>
          <Link to="/announcements" className="flex items-center space-x-1 text-white">
            <Bell className="h-4 w-4" />
            <span>Announcements</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-1 text-white">
            <Info className="h-4 w-4" />
            <span>About Us</span>
          </Link>
          {userRole === 'DEO' && (
            <Link to="/upload" className="flex items-center space-x-1 text-white">
              <span>Upload</span>
            </Link>
          )}
          {userRole === 'Project Coordinator' && (
            <>
              <Link to="/uploads" className="flex items-center space-x-1 text-white">
                <Upload className="h-4 w-4" />
                <span>Uploads</span>
              </Link>
              <Link to="/list" className="flex items-center space-x-1 text-white">
                <List className="h-4 w-4" />
                <span>List</span>
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm hidden md:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-[#6D28D9] font-semibold px-6 py-2 rounded-2xl shadow-lg border-2 border-[#6D28D9] hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center space-x-2 bg-[#FFB900] text-[#1E293B] font-bold px-6 py-2 rounded-xl shadow-md border-2 border-[#FFB900] hover:bg-[#FFA500] hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <UserPlus className="h-5 w-5" />
                <span>Signup</span>
              </Link>
              <Link
                to="/login"
                 className="flex items-center space-x-2 bg-white text-[#1E3A8A] font-semibold px-6 py-2 rounded-xl shadow-md border border-[#1E3A8A] hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
