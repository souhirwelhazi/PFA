import { Typography } from "@mui/material";
import { TableListView } from "../../../components";
import { useState, useEffect } from "react";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import axios from "axios";

const CondidateList = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_API_URL}/admin/candidat/list`
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <div className="bg-gray-50 dark:bg-gray-900 shadow-md sm:rounded-lg flex items-center p-1 mb-1">
                <PlaylistAddCheckCircleIcon sx={{ color: "green", mr: 1 }} />
                <Typography
                    variant="h6"
                    className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    La List des condidats
                </Typography>
            </div>
            <TableListView users={users} />
        </div>
    );
};

export default CondidateList;
