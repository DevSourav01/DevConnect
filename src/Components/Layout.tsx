import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Lib/firebase";
import useAuth from "../Hooks/useAuth";

const Layout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <nav
        className="h-14 border-b border-gray-100 bg-white
                     flex items-center gap-4 px-6 shrink-0"
      >
        <span className="text-[#534AB7] font-semibold text-lg mr-2">
          DevConnect
        </span>

        <input
          type="text"
          placeholder="Search developers..."
          className="flex-1 max-w-xs bg-gray-50 border border-gray-200
                     rounded-full px-4 py-1.5 text-sm focus:outline-none
                     focus:ring-2 focus:ring-purple-300"
        />

        <div className="ml-auto flex items-center gap-3">
          <img
            src={currentUser?.avatarURL}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-gray-100"
          />
          <span
            className="text-sm font-medium border border-gray-200
                         px-3 py-1 rounded-lg"
          >
            {currentUser?.displayName}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className="w-48 border-r border-gray-100 bg-white
                          flex flex-col gap-1 p-3 shrink-0"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm
              transition-colors
              ${
                isActive
                  ? "bg-[#EEEDFE] text-[#3C3489] font-medium border border-[#AFA9EC]"
                  : "text-gray-500 hover:bg-gray-50"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm
              transition-colors
              ${
                isActive
                  ? "bg-[#EEEDFE] text-[#3C3489] font-medium border border-[#AFA9EC]"
                  : "text-gray-500 hover:bg-gray-50"
              }`
            }
          >
            Feed
          </NavLink>

          <NavLink
            to="/connections"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm
              transition-colors
              ${
                isActive
                  ? "bg-[#EEEDFE] text-[#3C3489] font-medium border border-[#AFA9EC]"
                  : "text-gray-500 hover:bg-gray-50"
              }`
            }
          >
            Connections
          </NavLink>

          <NavLink
            to="/referrals"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm
              transition-colors
              ${
                isActive
                  ? "bg-[#EEEDFE] text-[#3C3489] font-medium border border-[#AFA9EC]"
                  : "text-gray-500 hover:bg-gray-50"
              }`
            }
          >
            Referrals
          </NavLink>

          <NavLink
            to={`/profile/${currentUser?.uid}`}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm
              transition-colors
              ${
                isActive
                  ? "bg-[#EEEDFE] text-[#3C3489] font-medium border border-[#AFA9EC]"
                  : "text-gray-500 hover:bg-gray-50"
              }`
            }
          >
            Profile
          </NavLink>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
