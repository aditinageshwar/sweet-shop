import { Link } from 'react-router-dom';
import { FaHome, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Header = ({ isLoggedIn, isAdmin, handleLogout }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-sky-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
          Sweet Shop
        </Link>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-200 transition flex items-center">
                <FaHome className="mr-1" /> Dashboard
              </Link>

              {isAdmin && (
                <Link to="/admin" className="hover:text-blue-200 transition flex items-center">
                  <FaCog className="mr-1" /> Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition flex items-center"
            >
              <FaUser className="mr-1" /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
