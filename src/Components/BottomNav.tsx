import { NavLink } from 'react-router-dom'
import useAuth     from '../Hooks/useAuth'

const BottomNav = () => {
  const { currentUser } = useAuth()

  const itemClass = (isActive: boolean) =>
    `flex flex-col items-center gap-0.5 text-xs py-2 px-4
    transition-colors
    ${isActive ? 'text-[#534AB7] font-medium' : 'text-gray-400'}`

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30
                   bg-white border-t border-gray-100
                   flex items-center justify-around
                   md:hidden pb-safe">

      <NavLink to="/" end
        className={({ isActive }) => itemClass(isActive)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2L2 9h2v9h5v-5h2v5h5V9h2L10 2z"/>
        </svg>
        Home
      </NavLink>

      <NavLink to="/feed"
        className={({ isActive }) => itemClass(isActive)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h8v2H3v-2z"/>
        </svg>
        Feed
      </NavLink>

      <NavLink to="/connections"
        className={({ isActive }) => itemClass(isActive)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0zM1 16a7 7 0 0114 0H1zm8 0a7 7 0 0114 0h-4a3 3 0 00-6 0H9z"/>
        </svg>
        Connect
      </NavLink>

      <NavLink
        to={`/profile/${currentUser?.uid}`}
        className={({ isActive }) => itemClass(isActive)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H3z"/>
        </svg>
        Profile
      </NavLink>

    </nav>
  )
}

export default BottomNav