import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import {
    AdminNavLinks,
    ClientNavLinks,
    MoniteurNavLinks,
    SecretaireNavLinks,
} from "../utils/links";

const SideBar = ({ open, role }) => {
    const [links, setLinks] = useState(
        role === "admin"
            ? AdminNavLinks
            : role === "candidat"
            ? ClientNavLinks
            : role === "moniteur"
            ? MoniteurNavLinks
            : role === "secrétaire"
            ? SecretaireNavLinks
            : []
    );

    return (
        <div
            className={`bg-white dark:bg-gray-900 mt-16 fixed top-0 left-0 z-40 border-r border-gray-300 h-screen ${
                open ? "w-72" : "w-16"
            } duration-500 text-gray-100 px-4`}>
            <div className="mt-4 flex flex-col gap-4 relative">
                {links.map((menu, i) => (
                    <Link
                        to={menu?.link}
                        key={i}
                        className={` ${
                            menu?.margin && "mt-5"
                        } group flex items-center text-sm gap-3.5 font-medium p-1 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md`}>
                        <div>
                            {React.createElement(menu?.icon, {
                                size: "20",
                            })}
                        </div>
                        <h2
                            hover:text-white
                            style={{
                                transitionDelay: `${i + 3}00ms`,
                            }}
                            className={`whitespace-pre duration-500 ${
                                !open &&
                                "opacity-0 translate-x-28 overflow-hidden"
                            }`}>
                            {menu?.name}
                        </h2>
                        <h2
                            className={`${
                                open && "hidden"
                            } absolute left-48 bg-white font-semibold whitespace-pre text-blue-600 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>
                            {menu?.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
