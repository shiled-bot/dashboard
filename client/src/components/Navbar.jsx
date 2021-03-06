import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../images/avatar.png";
import { useDispatch, useSelector } from "react-redux"
import { checkIsUserAuth, changeAvatarImageValid } from "redux/slices/authSlice";


const DefaultAvatar = ({ username }) => {
  const text = username
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase());

  return (
    <div className="rounded-full w-10 h-10 bg-blue font-medium text-sm flex items-center justify-center select-none">
      {text}
    </div>
  );
};

const ProfileDropdown = ({ avatarImageValid, user: { avatar, username, id } }) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();

  const dropdownHandler = () => setActive(!isActive);

  const dropdownBtnEle = useRef();
  const dropdownEle = useRef();

  useEffect(() => {
    const listener = ({ target }) => {
      if (
          (
            !target.isSameNode(dropdownBtnEle.current) &&
            !dropdownBtnEle.current.contains(target)
          ) &&
          (
            !target.isSameNode(dropdownEle.current) &&
            !dropdownEle.current.contains(target)
          )
      )
      setActive(false);
    };

    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener)
  }, [])

  return (
    <div className="hidden relative md:block">
      <div className="flex items-center">
        <button
          className="w-10 h-10 outline-none rounded-full hover:opacity-90"
          onClick={dropdownHandler}
          ref={dropdownBtnEle}
        >
          {avatarImageValid ? (
            <img
              src={avatar}
              className="w-full h-full rounded-full"
              onError={() => dispatch(changeAvatarImageValid(false))}
              alt={username}
            />
          ) : (
            <DefaultAvatar username={username} />
          )}
        </button>
      </div>
      <ul
        className={`bg-nav -left-40 top-16 absolute border overflow-hidden border-white-300 rounded-md text-sm w-52 shadow-md ${isActive ? "block" : "hidden"}`}
        ref={dropdownEle}
      >
        <li className="text-white-200 p-2.5">
          <span className="select-none">ID: </span>
          <span className="font-bold">{id}</span>
        </li>
        <Link
          to="/logout"
          className="flex items-center text-white-200 duration-75 p-2.5 hover:bg-[#131212] hover:pl-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4 text-[#b12323] rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </Link>
      </ul>
    </div>
  );
};

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const mobileNavDisplay = isActive ? "flex" : "hidden";
  const dispatch = useDispatch()
  const { user, avatarImageValid, isLoggedIn } = useSelector(state => state.auth)


  const toogleLinksHandler = () => setActive(!isActive);

  useEffect(() => {
    dispatch(checkIsUserAuth())
  }, [dispatch]);

  return (
    <nav className="bg-nav relative z-10 shadow-sm font-serif px-8 py-5 md:py-4">
      <div className="flex justify-between items-center md:flex-row flex-row-reverse">
        {/* Links */}
        <ul
          className={
            "md:flex md:flex-row md:static md:gap-6 md:w-max w-72 top-[67px] z-20 text-white-200 text-sm font-medium absolute shadow-lg flex-col bg-nav rounded-b overflow-hidden " +
            mobileNavDisplay
          }
        >
          {
            isLoggedIn && (
              <Link
                to="/dashboard"
                className="md:hover:bg-transparent md:p-0 hover:text-white-100 hover:bg-[#131212] duration-300 hover:pl-7 md:hover:p-0 px-5 pr-2 py-3"
              >
                Dashboard
              </Link>
            )
          }
          <Link
            to="/commands"
            className="md:hover:bg-transparent md:p-0 hover:text-white-100 hover:bg-[#131212] duration-300 hover:pl-7 md:hover:p-0 px-5 pr-2 py-3"
          >
            Commands
          </Link>
          <a
            href="/support"
            target="_blank"
            className="md:hover:bg-transparent md:p-0 hover:text-white-100 hover:bg-[#131212] duration-300 hover:pl-7 md:hover:p-0 px-5 pr-2 py-3"
          >
            Support
          </a>

          {user ? (
            <>
              <li className="md:hidden flex items-center text-white-100 md:p-0 md:hover:p-0 px-5 pr-2 py-3">
                {avatarImageValid ? (
                  <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-full"
                    alt={user.username}
                    onError={() => dispatch(changeAvatarImageValid(false))}
                  />
                ) : (
                  <DefaultAvatar username={user.username} />
                )}
                <span className="ml-2 w-44 overflow-hidden text-ellipsis">
                  {user.username}#{user.discriminator}
                </span>
              </li>
              <Link
                to="/logout"
                className="md:hidden flex items-center bg-[#0e0e0e] hover:bg-body duration-300 hover:pl-3 md:hover:p-0 px-5 pr-2 py-3 text-white-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4 text-[#b12323] rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="md:hidden flex items-center bg-[#0e0e0e] hover:bg-body duration-300 hover:pl-7 md:hover:p-0 px-5 pr-2 py-3 text-white-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4 text-blue rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </Link>
          )}
        </ul>

        {/* Login button or User block */}
        {user ? (
          <ProfileDropdown avatarImageValid={avatarImageValid} user={user} />
        ) : (
          <div className="md:block hidden">
            <Link
              to="/login"
              className="px-3 py-2 rounded text-white-100 border-white-400 border duration-300 hover:border-[#303030] hover:rounded-none hover:shadow-sm active:shadow-lg"
            >
              Login
            </Link>
          </div>
        )}

        {/* Nav Button */}
        <div
          onClick={toogleLinksHandler}
          className="block md:hidden cursor-pointer text-white-200"
        >
          {isActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Logo Image */}
      <div className="absolute flex md:block md:top-1 md:left-1/2 md:-translate-x-1/2 top-[2px] left-4 md:after:content-none after:content-['Shield_Bot'] after:items-center after:flex after:font-bold after:text-xl after:text-white-200">
        <img
          src={logo}
          className="select-none md:border-solid md:border-2 md:border-body md:w-24 md:rounded-full border-none rounded-none w-16"
          alt="logo"
        />
      </div>
    </nav>
  );
};

export default Navbar;
