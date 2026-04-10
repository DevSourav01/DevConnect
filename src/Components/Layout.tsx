import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../Lib/firebase'
import useAuth from '../Hooks/useAuth'
import BottomNav from './BottomNav'

const linkClass = (isActive: boolean) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
    isActive
      ? 'bg-[#EEEDFE] text-[#3C3489] font-medium border border-[#AFA9EC]'
      : 'text-gray-500 hover:bg-gray-50'
  }`

const Layout = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* ── NAVBAR ── */}
      <nav
        className="h-14 border-b border-gray-100 bg-white
                   flex items-center gap-3 px-4 shrink-0 z-30"
      >
        {/* hamburger — mobile only */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-800 p-1"
          onClick={() => setSidebarOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect y="3" width="20" height="2" rx="1" />
            <rect y="9" width="20" height="2" rx="1" />
            <rect y="15" width="20" height="2" rx="1" />
          </svg>
        </button>

        <span className="text-[#534AB7] font-semibold text-lg">
          DevConnect
        </span>

        {/* search — desktop only */}
        <input
          type="text"
          placeholder="Search developers..."
          className="hidden md:block flex-1 max-w-xs bg-gray-50
                     border border-gray-200 rounded-full px-4 py-1.5
                     text-sm focus:outline-none focus:ring-2
                     focus:ring-purple-300"
        />

        <div className="ml-auto flex items-center gap-2">
          <img
            src={currentUser?.avatarURL}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-gray-100"
          />

          {/* name — desktop only */}
          {/* <span
            className="hidden md:inline text-sm font-medium
                       border border-gray-200 px-3 py-1 rounded-lg"
          >
            {currentUser?.displayName}
          </span> */}

          <button
            onClick={handleLogout}
            className="hidden md:inline text-sm text-red-400
                       hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ── OVERLAY (mobile) ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside
          className={`fixed md:static top-0 left-0 h-full w-52 z-50
          bg-white border-r border-gray-100
          flex flex-col gap-1 p-3 shrink-0
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          {/* close button — mobile only */}
          <div className="flex items-center justify-between mb-2 md:hidden">
            <span className="text-[#534AB7] font-semibold">DevConnect</span>
            <button
              onClick={closeSidebar}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ×
            </button>
          </div>

          <NavLink
            to="/"
            end
            onClick={closeSidebar}
            className={({ isActive }) => linkClass(isActive)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/feed"
            onClick={closeSidebar}
            className={({ isActive }) => linkClass(isActive)}
          >
            Feed
          </NavLink>

          <NavLink
            to="/connections"
            onClick={closeSidebar}
            className={({ isActive }) => linkClass(isActive)}
          >
            Connections
          </NavLink>

          <NavLink
            to="/referrals"
            onClick={closeSidebar}
            className={({ isActive }) => linkClass(isActive)}
          >
            Referrals
          </NavLink>

          <NavLink
            to={`/profile/${currentUser?.uid}`}
            onClick={closeSidebar}
            className={({ isActive }) => linkClass(isActive)}
          >
            Profile
          </NavLink>

          {/* logout — mobile sidebar only */}
          <button
            onClick={handleLogout}
            className="md:hidden mt-auto text-sm text-red-400 text-left px-3 py-2.5"
          >
            Logout
          </button>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      <BottomNav/>
    </div>
  )
}

export default Layout