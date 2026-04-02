import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Lib/firebase";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-blue-600 font-bold text-lg">
        DevConnect
      </Link>

      <div className="flex items-center gap-4">
        {currentUser ? (
          // logged in
          <>
            <Link
              to="/developers"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Developers
            </Link>
            <Link
              to={`/profile/${currentUser.uid}`}
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          // not logged in
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
