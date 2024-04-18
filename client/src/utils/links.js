import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import TuneIcon from "@mui/icons-material/Tune";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import Face3OutlinedIcon from "@mui/icons-material/Face3Outlined";
import SchoolIcon from "@mui/icons-material/School";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

export const AdminNavLinks = [
    {
        name: "Réclamation",
        link: "/admin/reclamation",
        icon: NewReleasesOutlinedIcon,
    },
    {
        name: "Candidat",
        link: "/admin/candidat",
        icon: SchoolIcon,
        margin: true,
    },
    { name: "Moniteur", link: "/admin/moniteur", icon: SensorOccupiedIcon },
    { name: "Secrétaire", link: "/admin/secretaire", icon: Face3OutlinedIcon },
];
export const ClientNavLinks = [
    { name: "dashboard", link: "/", icon: DashboardIcon },
    { name: "messages", link: "/", icon: StickyNote2Icon },
    { name: "analytics", link: "/", icon: StickyNote2Icon, margin: true },
    { name: "Saved", link: "/", icon: StickyNote2Icon, margin: true },
    { name: "Setting", link: "/", icon: TuneIcon },
];
export const MoniteurNavLinks = [
    { name: "dashboard", link: "/", icon: DashboardIcon },
    { name: "user", link: "/", icon: AccountCircleIcon },
];
export const SecretaireNavLinks = [
    { name: "dashboard", link: "/", icon: DashboardIcon },
];
