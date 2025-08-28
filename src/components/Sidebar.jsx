import { useState } from "react"
import PropTypes from "prop-types"
import { NavLink, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../reducers/authSlice"

// Icons
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaUserTie,
  FaTools,
  FaBell,
} from "react-icons/fa"
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu"

// Your logo asset
import logo from "../assets/images/icons.png"

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LuLayoutDashboard />,
  },
  {
    title: "Managers",
    path: "/managers",
    icon: <FaUserTie />,
  },
  {
    title: "Technicians",
    path: "/technicians",
    icon: <FaTools />,
  },
  {
    title: "Notifications",
    path: "/notifications/create",
    icon: <FaBell />,
  },
]

function SidebarItem({ item, isSidebarExpanded, onExpand }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubLinks = item.links && item.links.length > 0
  const location = useLocation()

  let subLinks = []
  if (hasSubLinks) {
    subLinks = item.links
  }
  const isParentActive =
    hasSubLinks &&
    subLinks.some((link) => location.pathname.startsWith(link.path))

  const handleItemClick = () => {
    if (!isSidebarExpanded && hasSubLinks) {
      onExpand()
      setIsOpen(true)
    } else if (hasSubLinks) {
      setIsOpen(!isOpen)
    }
  }

  if (hasSubLinks) {
    return (
      <div>
        <button
          onClick={handleItemClick}
          title={!isSidebarExpanded ? item.title : undefined}
          className={`
            w-full h-10 flex items-center
            ${isSidebarExpanded ? "justify-between px-4" : "justify-center"}
            font-medium border-l-4
            ${isParentActive
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-700 dark:text-facebook-textSecondary hover:bg-gray-100 dark:hover:bg-facebook-hover hover:text-gray-900 dark:hover:text-facebook-text"
            }
          `}
        >
          <div className="flex items-center gap-3 whitespace-nowrap overflow-hidden">
            <span className="text-inherit text-base">{item.icon}</span>
            {isSidebarExpanded && <span className="text-sm text-inherit">{item.title}</span>}
          </div>
          {isSidebarExpanded && (
            <span className="text-inherit text-xs">
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          )}
        </button>
        {isOpen && isSidebarExpanded && (
          <div className="flex flex-col ml-6 border-l border-gray-200 dark:border-facebook-border">
            {subLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                title={!isSidebarExpanded ? link.label : undefined}
                className={({ isActive }) =>
                  `
                    h-10 flex items-center pl-2 text-xs transition-colors
                    whitespace-nowrap overflow-hidden
                    border-l-4
                    ${isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-600 dark:text-facebook-textMuted hover:bg-gray-100 dark:hover:bg-facebook-hover hover:text-gray-800 dark:hover:text-facebook-textSecondary"
                  }
                  `
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={item.path}
      title={!isSidebarExpanded ? item.title : undefined}
      className={({ isActive }) =>
        `
         w-full h-10 flex items-center
         ${isSidebarExpanded ? "justify-start px-4 gap-3" : "justify-center"}
         font-medium border-l-4
         ${isActive
          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400"
          : "border-transparent text-gray-700 dark:text-facebook-textSecondary hover:bg-gray-100 dark:hover:bg-facebook-hover hover:text-gray-900 dark:hover:text-facebook-text"
        }
        `
      }
    >
      <span className="text-inherit text-base">{item.icon}</span>
      {isSidebarExpanded && (
        <span className="whitespace-nowrap text-sm text-inherit overflow-hidden">{item.title}</span>
      )}
    </NavLink>
  )
}

SidebarItem.propTypes = {
  item: PropTypes.object.isRequired,
  isSidebarExpanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func,
}

export default function Sidebar({ isExpanded, setIsExpanded }) {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <aside
      className={`
        sticky top-0 left-0 z-10
        flex flex-col h-screen border-r border-gray-200 dark:border-facebook-border bg-white dark:bg-facebook-card
        ${isExpanded ? "w-64" : "w-20"}
        transition-all duration-300 overflow-hidden
      `}
    >
      {/* Header / Logo */}
      <div
        className={`
          flex items-center justify-center bg-gray-50 dark:bg-facebook-dark h-24 shadow-sm transition-all duration-300
        `}
      >
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className={`object-contain transition-all duration-300 filter brightness-90 contrast-110 saturate-125 hover:brightness-100 hover:contrast-125 dark:brightness-200 dark:contrast-150 dark:saturate-150 dark:hover:brightness-250 dark:hover:contrast-175 ${isExpanded ? 'w-40' : 'w-10'
              }`}
          />
        </div>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            isSidebarExpanded={isExpanded}
            onExpand={() => setIsExpanded(true)}
          />
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        title={!isExpanded ? "Logout" : undefined}
        className={`
          w-full h-10 flex items-center 
          ${isExpanded ? "justify-start px-4 gap-3" : "justify-center"}
          text-sm font-medium border-l-4
          border-transparent text-gray-700 dark:text-facebook-textSecondary hover:bg-gray-100 dark:hover:bg-facebook-hover hover:text-red-600 dark:hover:text-red-400
        `}
      >
        <LuLogOut className="text-base" />
        {isExpanded && <span>Logout</span>}
      </button>

      {/* Expand/Collapse Toggle */}
      <div className="border-t border-gray-200 dark:border-facebook-border">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          title={!isExpanded ? "Expand" : undefined}
          className={`
            w-full h-10 flex items-center 
            ${isExpanded ? "justify-start px-4 gap-3" : "justify-center"}
            text-sm font-medium border-l-4
            border-transparent text-gray-700 dark:text-facebook-textSecondary hover:bg-gray-100 dark:hover:bg-facebook-hover hover:text-gray-900 dark:hover:text-facebook-text
          `}
        >
          {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
          {isExpanded && <span>Expand</span>}
        </button>
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  setIsExpanded: PropTypes.func.isRequired,
}