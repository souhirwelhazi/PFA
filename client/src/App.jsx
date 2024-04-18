import { useEffect, useRef, useState } from "react";
import {
    Claim,
    History,
    Home,
    Login,
    Profile,
    Register,
    ClientList,
    AdminClaimList,
    SecretaireList,
    MoniteurList,
} from "./pages";
import { Routes, Route, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./App.css";
import { Navbar, SideBar, InternalNavBar } from "./components";
import { Typography } from "@mui/material";
import CondidateList from "./pages/admin/candidatList/CondidateList";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                setIsAuthenticated(false);
                localStorage.removeItem("token");
            } else {
                setIsAuthenticated(true);
            }

            if (decoded.Role === "admin") {
                setRole("admin");
            } else {
                setRole("client");
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <>
            <div className="flex flex-col h-screen flex-grow bg-gray-50 font-sans">
                {isAuthenticated ? (
                    <InternalNavBar open={open} setOpen={setOpen} />
                ) : (
                    <Navbar />
                )}
                <div className="flex ">
                    {isAuthenticated && <SideBar role={role} open={open} />}
                    <div
                        className={`w-full flex flex-col justify-center items-center ${
                            isAuthenticated && "h-screen pt-10 mx-40"
                        }`}>
                        <div className={`w-full ${isAuthenticated && "ml-20"}`}>
                            <Routes>
                                {!isAuthenticated && (
                                    <>
                                        <Route
                                            path="/seconnecter"
                                            element={<Login role={role} />}
                                        />
                                        <Route
                                            path="/inscriptiion"
                                            element={<Register />}
                                        />
                                        <Route path="/" element={<Home />} />
                                    </>
                                )}
                                {isAuthenticated && role === "candidat" && (
                                    <>
                                        <Route
                                            path="/client/reclamation"
                                            element={<Claim />}
                                        />
                                        <Route
                                            path="/client/reclamation/historique"
                                            element={<History />}
                                        />
                                    </>
                                )}
                                {isAuthenticated && role === "admin" && (
                                    <>
                                        <Route
                                            path="/admin/reclamation"
                                            element={<AdminClaimList />}
                                        />
                                        <Route
                                            path="/admin/candidat"
                                            element={
                                                <CondidateList role={role} />
                                            }
                                        />
                                        <Route
                                            path="/admin/moniteur"
                                            element={
                                                <MoniteurList role={role} />
                                            }
                                        />
                                        <Route
                                            path="/admin/secretaire"
                                            element={
                                                <SecretaireList role={role} />
                                            }
                                        />
                                    </>
                                )}
                                {isAuthenticated && role === "Moniteur" && (
                                    <></>
                                )}
                                {isAuthenticated && role === "Secrétaire" && (
                                    <></>
                                )}
                                <Route
                                    path="/profile/:userId"
                                    element={<Profile />}
                                />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
