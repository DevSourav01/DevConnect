import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Lib/firebase";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { currentUser } = useAuth();
  console.log(currentUser?.uid);
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
      {currentUser && (
        <Link to={`/profile/${currentUser.uid}`}>My Profile</Link>
      )}
      <div className="flex items-center gap-6">
        {currentUser ? (
          <>
            <div className="relative">
              <input
                type="text"
                placeholder="Search developers..."
                className="w-64 rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex items-center gap-2  bg-white px-2 py-1 ">
              <img
                src={currentUser.avatarURL}
                alt={currentUser.displayName}
                className="h-9 w-9 rounded-full object-cover"
              />

              <div className="relative">
                <select
                  onChange={handleLogout}
                  defaultValue=""
                  className="appearance-none bg-transparent px-2 py-1 pr-6 text-sm font-medium text-gray-700 outline-none cursor-pointer"
                >
                  <option value="" hidden>
                    {currentUser.displayName}
                  </option>
                  <option value="logout">Logout</option>
                </select>

                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  ▼
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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
