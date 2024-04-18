import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        userType: "candidat",
        adminInfo: "",
    });

    const navigate = useNavigate();
    console.log(formData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Special handling for adminInfo input when user type is admin
        if (name === "userType" && value === "admin") {
            setFormData((prevData) => ({
                ...prevData,
                userType: value,
                adminInfo: "",
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        const dataToSend = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
            userType: formData.userType,
            adminInfo: formData.adminInfo, // Only sent if userType is "admin"
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_API_URL}/inscription`,
                dataToSend
            );
            navigate("/seconnecter");
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl  bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)",
                        }}></div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center items-center">
                    <div className="mt-20 flex flex-col items-center">
                        <h1 className="text-xl font-extrabold">
                            Creer un Compte
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-6 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Entrez votre nom"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    className="w-full px-6 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text"
                                    placeholder="Entrez votre adresse e-mail"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    className="w-full px-6 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="number"
                                    placeholder="Entrez votre numéro de téléphone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    className="w-full px-6 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text"
                                    placeholder="Entrez votre adresse"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    className="w-full px-6 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    placeholder="Créez un mot de passe"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    placeholder="Confirmez le mot de passe"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="flex items-center gap-2 py-6">
                                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                        <input
                                            className="cursor-pointer w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            type="radio"
                                            name="userType"
                                            value="candidat"
                                            checked={
                                                formData.userType === "candidat"
                                            }
                                            onChange={handleInputChange}
                                            required
                                        />

                                        <label
                                            for="bordered-radio-1"
                                            className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Candidat
                                        </label>
                                    </div>
                                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                        <input
                                            className="cursor-pointer w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            type="radio"
                                            name="userType"
                                            value="admin"
                                            checked={
                                                formData.userType === "admin"
                                            }
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label
                                            for="bordered-radio-2"
                                            className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Admin
                                        </label>
                                    </div>
                                </div>
                                {formData.userType === "admin" && (
                                    <div className="input-box">
                                        <input
                                            className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-6"
                                            type="password"
                                            placeholder="Enter admin information"
                                            name="adminInfo"
                                            value={formData.adminInfo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )}
                                <button
                                    onClick={handleSubmit}
                                    className="py-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">connecter</span>
                                </button>
                                <p className="mt-2 text-xs text-gray-600 text-center flex items center">
                                    Vous avez déjà un compte ?
                                    <Link
                                        to={"/seconnecter"}
                                        className="ml-2 border-b font-semibold border-gray-500 hover:text-indigo-500">
                                        Connectez-vous maintenant
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
