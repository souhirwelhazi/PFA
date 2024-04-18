import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Switch from "@mui/material/Switch";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    Slide,
    Tooltip,
} from "@mui/material";
import { useEffect } from "react";
import "./style.css";
import { useRef } from "react";
import { useState } from "react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "Addresse",
        numeric: false,
        disablePadding: true,
        label: "Addresse",
    },
    {
        id: "Nom",
        numeric: false,
        disablePadding: true,
        label: "Nom",
    },

    {
        id: "Sujet",
        numeric: true,
        disablePadding: false,
        label: "Sujet",
    },
    {
        id: "Reclamation",
        numeric: true,
        disablePadding: false,
        label: "Reclamation",
    },
    {
        id: "Date",
        numeric: true,
        disablePadding: false,
        label: "Date",
    },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "center" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}></Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ open, setOpen }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description">
            <>
                <DialogContent>
                    <div className="text-red text-center text-3xl mb-4 flex justify-center items-center">
                        <CloudDoneIcon />
                    </div>
                    <p className="font-bold text-red text-center">
                        La réclamation est confirmée avec succès.
                    </p>
                </DialogContent>
            </>
        </Dialog>
    );
};

const AdminClaimList = () => {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [raportConfirmation, setRaportConfirmation] = useState({
        rowName: "",
        confirmed: false,
        rowAddress: "",
    });
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    const popupRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const fetchClaimHistory = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_API_URL
                    }/admin/reclamation/history`
                );
                const claimHistory = response.data;

                const formattedRows = claimHistory.map((claim) => ({
                    name: claim.name,
                    address: claim.address,
                    sujet: claim.sujet,
                    createdAt: claim.createdAt,
                    voice: claim.voiceRecording,
                    confirmed: claim.confirmed,
                    userId: claim.user,
                }));

                setRows(formattedRows);
            } catch (error) {
                console.error("Error fetching claim history:", error);
            }
        };

        fetchClaimHistory();

        const fetchInterval = setInterval(fetchClaimHistory, 3000);

        return () => {
            clearInterval(fetchInterval);
        };
    }, [userId]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder("asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const updateConfirmationStatus = (name, confirmed, address) => {
        setRaportConfirmation({
            rowName: name,
            confirmed,
            rowAddress: address,
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (address) => selected.indexOf(address) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const audioRef = React.useRef(null);

    const confirmClaim = async (userId) => {
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_SERVER_API_URL
                }/admin/reclamation/${userId}/confirmation`
            );
            if (response.status === 201) {
                setOpen(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {open && <Popup open={open} setOpen={setOpen} />}
            {rows.length === 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70vh",
                    }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div
                    className="overflow-y-scroll"
                    style={{ maxHeight: "80vh" }}>
                    <Box sx={{ width: "100%" }} ref={popupRef}>
                        <Paper sx={{ width: "100%", mb: 2 }}>
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={dense ? "small" : "medium"}>
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {rows.map((row, index) => {
                                            const isItemSelected = isSelected(
                                                row.address
                                            );
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            const isConfirmed =
                                                raportConfirmation.rowName ===
                                                    row.address &&
                                                raportConfirmation.confirmed;

                                            const audioBlob = new Blob(
                                                [
                                                    new Uint8Array(
                                                        row?.voice?.data?.data
                                                    ),
                                                ],
                                                { type: row.voice?.contentType }
                                            );

                                            // Create an object URL for the Blob
                                            const audioObjectURL =
                                                URL.createObjectURL(audioBlob);

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            row.address
                                                        )
                                                    }
                                                    role="checkbox"
                                                    aria-checked={
                                                        isItemSelected
                                                    }
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: "pointer" }}>
                                                    <TableCell></TableCell>

                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                        align="left"
                                                        sx={{ width: "100%" }}>
                                                        {row.address}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.sujet}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <div>
                                                            <audio
                                                                ref={audioRef}
                                                                controls>
                                                                <source
                                                                    src={
                                                                        audioObjectURL
                                                                    }
                                                                />
                                                            </audio>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            new Date(
                                                                row.createdAt
                                                            )
                                                                .toISOString()
                                                                .split("T")[0]
                                                        }
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {isConfirmed ||
                                                        row.confirmed ===
                                                            true ? (
                                                            <CloudDoneIcon
                                                                sx={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                        ) : (
                                                            <Button
                                                                variant="contained"
                                                                onClick={() =>
                                                                    confirmClaim(
                                                                        row.userId
                                                                    ).then(
                                                                        () => {
                                                                            updateConfirmationStatus(
                                                                                row.address,
                                                                                true,
                                                                                row.name
                                                                            );
                                                                        }
                                                                    )
                                                                }>
                                                                Confirmer
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height:
                                                        (dense ? 33 : 53) *
                                                        emptyRows,
                                                }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </div>
            )}
        </>
    );
};

export default AdminClaimList;
