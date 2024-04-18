import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import jwt_decode from "jwt-decode";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_API_URL}/login`,
                formData
            );
            const { token } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                const decoded = jwt_decode(token);

                const role = decoded.Role;

                const ROUTE = role === "client" ? "/client" : "/admin";

                navigate(`${ROUTE}/reclamation`);

                window.location.reload();
            } else {
                alert("Token missing in response");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl  bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center items-center">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-xl font-extrabold">Se connecter</h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Adresse e-mail"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Mot de passe"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <LoginIcon />
                                    <span className="ml-3">connecter</span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center flex items center">
                                    Pas encore membre ?
                                    <Link
                                        to="/inscriptiion"
                                        className="ml-2 border-b font-semibold border-gray-500 hover:text-indigo-500">
                                        Créer un compte
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)",
                        }}></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
