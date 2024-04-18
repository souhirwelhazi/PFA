import MenuIcon from "@mui/icons-material/Menu";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import jwt_decode from "jwt-decode";

const InternalNavBar = ({ open, setOpen }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const Navigate = useNavigate();

    const toggleUserMenu = () => {
        setUserMenuOpen((prev) => !prev);
    };

    const logout = async () => {
        localStorage.removeItem("token");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        Navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            setUserId(decoded.userId);
        } else {
            return;
        }
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 fixed top-0 w-screen h-16">
            <div className="w-screen flex flex-wrap items-center justify-between mx-auto py-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        type="button"
                        className="inline-flex items-center mx-3 p-2 w-10 h-10 justify-center text-sm rounded-lg text-blue-600 hover:text-white hover:bg-blue-600"
                        aria-expanded={open ? "true" : "false"}>
                        <span
                            className={`transform transition-transform ${
                                open ? "rotate-90" : "rotate-0"
                            }`}>
                            {open ? (
                                <ClearOutlinedIcon className="w-6 h-6" />
                            ) : (
                                <svg
                                    id="toggleSidebarMobileHamburger"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            )}
                        </span>
                    </button>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        <a href="#" className="flex items-center">
                            <img
                                src={logo}
                                className="h-6 mr-3 sm:h-9 rounded-full"
                                alt="Landwind Logo"
                            />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Autocompagnon
                            </span>
                        </a>
                    </span>
                </div>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse mr-10">
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={userMenuOpen ? "true" : "false"}
                        onClick={toggleUserMenu}>
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://static.vecteezy.com/system/resources/thumbnails/027/708/418/small/default-avatar-profile-icon-in-flat-style-free-vector.jpg"
                            alt="user photo"
                        />
                    </button>
                    <div
                        className={`z-50 absolute right-5 top-full mt-2 w-48 py-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
                            userMenuOpen ? "" : "hidden"
                        }`}
                        id="user-dropdown">
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link
                                    to={`profile/${userId}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Voire Profile
                                </Link>
                            </li>
                            <li>
                                <span
                                    onClick={logout}
                                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Sign out
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default InternalNavBar;
