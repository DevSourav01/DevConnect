import { NavLink } from 'react-router-dom'
import useAuth     from '../Hooks/useAuth'
import { MdRssFeed } from 'react-icons/md'
import { IoIosPeople, IoMdPerson } from 'react-icons/io'
import { FaHome } from 'react-icons/fa'

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
        <FaHome   size={20}/>
        Home
      </NavLink>

      <NavLink to="/feed"
        className={({ isActive }) => itemClass(isActive)}>
        <MdRssFeed size={20} />
        Feed
      </NavLink>

      <NavLink to="/connections"
        className={({ isActive }) => itemClass(isActive)}>
        <IoIosPeople  size={20} />
        Connect
      </NavLink>

      <NavLink
        to={`/profile/${currentUser?.uid}`}
        className={({ isActive }) => itemClass(isActive)}>
        <IoMdPerson size={20}  />
        Profile
      </NavLink>

    </nav>
  )
}

export default BottomNav