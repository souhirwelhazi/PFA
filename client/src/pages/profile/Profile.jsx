import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from "@mui/material";

const Profile = () => {
    const [User, setUser] = useState(null);

    const { userId } = useParams();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_API_URL}/user/${userId}`
                );

                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching claim history:", error);
            }
        };

        getUserData();
    }, [userId]);

    return (
        <>
            {User ? (
                <div className="flex flex-col justify-center items-center h-[90vh]">
                    <div className="relative flex flex-col items-center rounded-[20px] w-full border border-gray-200 mx-auto p-4 bg-white bg-clip-border shadow-md text-black">
                        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                            <img
                                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                                className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                            />
                            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                                <img
                                    className="h-full w-full rounded-full"
                                    src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="mt-16 flex flex-col items-center">
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                {User.userName}
                            </h4>
                            <p className="text-base font-normal text-gray-600">
                                {User.Role}
                            </p>
                        </div>
                        <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold text-navy-700 text-black ">
                                    Email
                                </p>
                                <p className="text-sm font-normal text-gray-600">
                                    {User.email}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold text-navy-700 text-black ">
                                    Address
                                </p>
                                <p className="text-sm font-normal text-gray-600">
                                    {User.address}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold text-navy-700 text-black ">
                                    Phone
                                </p>
                                <p className="text-sm font-normal text-gray-600">
                                    {User.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "calc(100vh - 40px)",
                    }}>
                    <CircularProgress />
                </Box>
            )}
        </>
    );
};

export default Profile;
