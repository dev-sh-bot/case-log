import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import DropdownMenu from "./DropdownMenu";
import { useMatches, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/authSlice";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const dispatch = useDispatch();
  const matches = useMatches();
  const navigate = useNavigate();

  const dummyOptions = [
    {
      label: "Logout",
      type: "button",
      action: () => {
        dispatch(logout());
      },
    },
  ];

  const handleGoBack = () => {
    navigate(sessionStorage.getItem("previousPage"));
  };

  // Find the deepest matched route with a handle
  const routeWithHandle = matches.reverse().find((match) => match.handle);
  const currentTitle = routeWithHandle?.handle?.title || "Default Title";

  return (
    <header className="top-header px-5 pt-5 dark:bg-facebook-dark">
      <div className="flex items-center justify-between bg-white dark:bg-facebook-card rounded-2xl px-5 py-3 border border-gray-200 dark:border-facebook-border">
        <div className="flex items-center justify-between">
          <div className="font-medium text-xl flex items-center gap-1 page-title text-gray-900 dark:text-facebook-text">
            <span className="cursor-pointer text-gray-600 dark:text-facebook-textSecondary hover:text-gray-900 dark:hover:text-facebook-text transition-colors">
              <MdKeyboardArrowLeft size={20} onClick={handleGoBack} />
            </span>
            {currentTitle}
          </div>
        </div>

        <div className="flex items-center gap-5">

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile Dropdown */}
            <DropdownMenu
              menuButtonLabel={
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm bg-blue-600 dark:bg-facebook-surface">
                  <FaRegUser size={20} className="text-white dark:text-facebook-text" />
                </div>
              }
              options={dummyOptions}
              spaceBetweenInPercent={110}
              widthAsClass={"w-40"}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;