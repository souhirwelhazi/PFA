import React, { useState, useRef } from "react";
import Axios from "axios";
import "./claim.css";
import {
    Button,
    Stack,
    ThemeProvider,
    Typography,
    CircularProgress,
    Box,
    createTheme,
} from "@mui/material";
import { ReactMic } from "react-mic";
import jwt_decode from "jwt-decode";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

const Claim = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        sujet: "",
    });

    const Navigate = useNavigate();

    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [loading, setLoading] = useState(false);

    const audioRef = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRecord = () => {
        setIsRecording((prevState) => !prevState);
    };

    const handleAudioRecordStop = (audioData) => {
        setAudioBlob(audioData.blob);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const decoded = jwt_decode(token);

            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("address", formData.address);
            formDataToSend.append("phoneNumber", formData.phoneNumber);
            formDataToSend.append("userId", decoded.userId);
            formDataToSend.append("sujet", formData.sujet);

            if (audioBlob) {
                const audioFile = new File([audioBlob], "recorded_audio.wav");
                formDataToSend.append("voiceRecording", audioFile);
                sendFormData(formDataToSend);
            } else {
                sendFormData(formDataToSend);
                setAudioBlob(null);
            }
        } catch (error) {
            console.error("Error sending form data:", error);
        }
    };

    const sendFormData = async (formData) => {
        try {
            if (audioBlob != null) {
                const res = await axios.post(
                    `${import.meta.env.VITE_SERVER_API_URL}/client/reclamation`,
                    formData
                );
                if (res.status === 201) {
                    handleClickOpen();
                    setLoading(false);
                }
            } else alert("Le champ d'enregistrement est nécesaire !!!");
        } catch (error) {
            console.error("Error sending form data:", error);
        }
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container">
            <ThemeProvider theme={theme}>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontSize: "2rem",
                        [theme.breakpoints.down("md")]: { fontSize: "1.5rem" },
                        fontWeight: "bold",
                    }}>
                    Envoyer une réclamation
                </Typography>
            </ThemeProvider>
            {open ? (
                <div className="container">
                    <div className="icon">
                        <CloudDoneIcon
                            sx={{
                                width: "100%", // Adjust the width for responsiveness
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "green",
                                fontSize: { xs: 40, sm: 60 }, // Adjust font size for different screen sizes
                            }}
                        />
                    </div>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            fontSize: "2rem",
                            [theme.breakpoints.down("md")]: {
                                fontSize: "1.5rem",
                            },
                            fontWeight: "bold",
                            mb: 2,
                        }}>
                        Votre réclamation a été envoyée avec succès
                    </Typography>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="contained"
                            onClick={() =>
                                Navigate("/client/reclamation/historique")
                            }>
                            Consulter l'historique
                        </Button>
                    </Stack>
                </div>
            ) : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                    />
                    <input
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                    />
                    <input
                        type="text"
                        name="sujet"
                        value={formData.sujet}
                        onChange={handleChange}
                        placeholder="sujet"
                        required
                    />
                    <ReactMic
                        record={isRecording}
                        className="sound-wave"
                        onStop={handleAudioRecordStop}
                        strokeColor="#000000"
                        backgroundColor="#FFFFFF"
                    />
                    <button type="button" onClick={handleRecord}>
                        {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>
                    {audioBlob && (
                        <Box sx={{ mt: 2 }}>
                            <div>
                                <audio ref={audioRef} controls>
                                    <source
                                        src={URL.createObjectURL(audioBlob)}
                                    />
                                </audio>
                            </div>
                        </Box>
                    )}
                    {loading ? (
                        <Box sx={{ mt: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <button type="submit">Submit</button>
                    )}
                </form>
            )}
        </div>
    );
};

export default Claim;
