import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const TableListView = ({ users }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const urlParts = window.location.href.split("/");
    const [Role, setRole] = useState(urlParts[urlParts.length - 1]);
    const [userId, setUserId] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        userName: "",
    });
    const [addUserData, setAddUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userName: "",
        address: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangeAdd = (e) => {
        const { name, value } = e.target;
        setAddUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(
                `${
                    import.meta.env.VITE_SERVER_API_URL
                }/admin/user/delete/${userId}`
            );

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };
    const updateUserData = async (userId, formData) => {
        try {
            // Concatenate first name and last name to create userName
            const userName = formData.firstName + " " + formData.lastName;
            // Update formData with the concatenated userName
            formData.userName = userName;

            const res = await axios.put(
                `${
                    import.meta.env.VITE_SERVER_API_URL
                }/admin/user/updateUserData/${userId}`,
                formData
            );

            if (res.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            // Handle error, if needed
        }
    };

    const handleAddUser = async (formData) => {
        try {
            // Concatenate first name and last name to create userName
            const userName = formData.firstName + " " + formData.lastName;
            // Update formData with the concatenated userName
            formData.userName = userName;

            // Add role to the formData
            formData.role = Role;

            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_API_URL}/admin/user/create`,
                formData
            );
            if (res.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error adding user:", error);
            // Handle error, if needed
        }
    };

    const filteredUsers = users.filter((user) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-center flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="checkbox-all-search"
                                    className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nom et Prénom
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Numéro du télèphone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span
                                className="cursor-pointer"
                                onClick={() => setShowAddModal(true)}>
                                <Tooltip title="Ajouter un compte">
                                    <AddCircleOutlineIcon
                                        sx={{ color: "blue" }}
                                        className="w-6 h-6"
                                    />
                                </Tooltip>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-table-search-${index}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor={`checkbox-table-search-${index}`}
                                        className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="">
                                    <div className="font-normal text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{user.userName}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    {user.phone}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    href="#"
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(true);
                                        setUserId(user._id);
                                    }}
                                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit user
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    href="#"
                                    type="button"
                                    onClick={() => deleteUser(user._id)}
                                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    <Tooltip title="suprimer la compte">
                                        <DeleteIcon
                                            sx={{ color: "red" }}
                                            className="w-6 h-6"
                                        />
                                    </Tooltip>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEditModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowEditModal(false)}
                    className="bg-slate-900/20 backdrop-blur-sm p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer">
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white text-black p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden">
                        <form className="relativerounded-lg shadow dark:bg-gray-700">
                            <div className="w-full flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-black">
                                    Edit user
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-black"
                                    data-modal-hide="editUserModal">
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block mb-2 text-sm font-medium text-black">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="first-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Bonnie"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block mb-2 text-sm font-medium text-black">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="last-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Green"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-black">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400s dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="example@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="phone-number"
                                            className="block mb-2 text-sm font-medium text-black">
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            name="phoneNumber"
                                            id="phone-number"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400s dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="e.g. +(12)3456 789"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="submit"
                                    onClick={(e) =>
                                        updateUserData(userId, formData)
                                    }
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Save all
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
            {showAddModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAddModal(false)}
                    className="bg-slate-900/20 backdrop-blur-sm p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer">
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white text-black p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden">
                        <div className="relativerounded-lg shadow dark:bg-gray-700">
                            <div className="w-full flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-black">
                                    Ajouter un {Role}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-black"
                                    data-modal-hide="editUserModal">
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block mb-2 text-sm font-medium text-black">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="first-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Bonnie"
                                            value={addUserData.firstName}
                                            onChange={handleChangeAdd}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block mb-2 text-sm font-medium text-black">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="last-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Green"
                                            value={addUserData.lastName}
                                            onChange={handleChangeAdd}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-black">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400s dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="example@company.com"
                                            value={addUserData.email}
                                            onChange={handleChangeAdd}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="phone-number"
                                            className="block mb-2 text-sm font-medium text-black">
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            name="phone"
                                            id="phone"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400s dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="e.g. +(12)3456 789"
                                            value={addUserData.phone}
                                            onChange={handleChangeAdd}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="phone-number"
                                            className="block mb-2 text-sm font-medium text-black">
                                            address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="adress"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400s dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="address"
                                            value={addUserData.adress}
                                            onChange={handleChangeAdd}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="phone-number"
                                            className="block mb-2 text-sm font-medium text-black">
                                            Mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400s dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="mote de passe"
                                            value={addUserData.password}
                                            onChange={handleChangeAdd}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="submit"
                                    onClick={() => handleAddUser(addUserData)}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default TableListView;
