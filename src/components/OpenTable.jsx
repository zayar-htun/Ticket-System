// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TablePagination from "@mui/material/TablePagination";
// import Paper from "@mui/material/Paper";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import { Box, Divider, IconButton, InputBase } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// export default function OpenTable({ tickets }) {
//     const navigate = useNavigate();
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);

//     React.useEffect(() => {
//         // Retrieve page and rowsPerPage from the URL parameters
//         const urlParams = new URLSearchParams(location.search);
//         const pageParam = parseInt(urlParams.get("page"), 10) || 0;
//         const rowsPerPageParam =
//             parseInt(urlParams.get("rowsPerPage"), 10) || 7;

//         // Set the retrieved values as the initial state
//         setPage(pageParam);
//         setRowsPerPage(rowsPerPageParam);
//     }, [location.search]);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//         // Update the URL with the new page value
//         navigate(`?page=${newPage}&rowsPerPage=${rowsPerPage}`);
//     };

//     // const handleChangeRowsPerPage = event => {
//     //     setRowsPerPage(parseInt(event.target.value, 10));
//     //     setPage(0);
//     // };
//     const handleChangeRowsPerPage = event => {
//         const newRowsPerPage = parseInt(event.target.value, 10);
//         setRowsPerPage(newRowsPerPage);
//         setPage(0);
//         // Update the URL with the new rowsPerPage value
//         navigate(`?page=0&rowsPerPage=${newRowsPerPage}`);
//     };

//     return (
//         <Box>
//             <Box sx={{mb:2}}>
//                 <Paper
//                     component="form"
//                     sx={{
//                         p: "2px 4px",
//                         display: "flex",
//                         alignItems: "center",

//                     }}
//                 >
//                     <InputBase
//                         sx={{ ml: 1, flex: 1 }}
//                         placeholder="Search Open Tickets"
//                         inputProps={{ "aria-label": "search google maps" }}
//                     />
//                     <IconButton
//                         type="button"
//                         sx={{ p: "10px" }}
//                         aria-label="search"
//                     >
//                         <SearchIcon />
//                     </IconButton>
//                     <Divider
//                         sx={{ height: 28, m: 0.5 }}
//                         orientation="vertical"
//                     />
//                 </Paper>
//             </Box>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow style={{ background: "#E8E9EB" }}>
//                             <TableCell>Subject</TableCell>
//                             <TableCell align="right">Ticket_id</TableCell>
//                             <TableCell align="right">Category</TableCell>
//                             <TableCell align="right">Priority</TableCell>
//                             <TableCell align="right">
//                                 Solution Provider
//                             </TableCell>
//                             <TableCell align="right">Company</TableCell>
//                             <TableCell align="right">Created_at</TableCell>
//                             <TableCell align="right">Updated_at</TableCell>
//                             <TableCell align="right">Updated_By</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {tickets
//                             .filter(tic => tic.status === "open")
//                             .slice(
//                                 page * rowsPerPage,
//                                 page * rowsPerPage + rowsPerPage
//                             )
//                             .map(row => (
//                                 <TableRow
//                                     key={row.guid}
//                                     sx={{
//                                         "&:last-child td, &:last-child th": {
//                                             border: 0,
//                                         },
//                                     }}
//                                     onClick={() => {
//                                         navigate(
//                                             `/ticketdetail/${row.ticket}/${row.guid}`
//                                         );
//                                     }}
//                                 >
//                                     <TableCell component="th" scope="row">
//                                         {row.title}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         {row.ticket}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         {row.category}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         {row.priority}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         {row.personName}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         {row.companyName}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         {moment(row.createdOn).format(
//                                             "DD/MM/YYYY h:mm:ss a"
//                                         )}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         {moment(row.updatedOn).format(
//                                             "DD/MM/YYYY h:mm:ss a"
//                                         )}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         {row.name}
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                     </TableBody>
//                 </Table>
//                 <TablePagination
//                     rowsPerPageOptions={[7, 14, 21]}
//                     component="div"
//                     count={tickets.filter(tic => tic.status === "open").length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </TableContainer>
//         </Box>
//     );
// }

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Box, Divider, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function OpenTable({ tickets }) {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = React.useState("");

    React.useEffect(() => {
        // Retrieve page, rowsPerPage, and searchQuery from the URL parameters
        const urlParams = new URLSearchParams(location.search);
        const pageParam = parseInt(urlParams.get("page"), 10) || 0;
        const rowsPerPageParam =
            parseInt(urlParams.get("rowsPerPage"), 10) || 7;
        const searchQueryParam = urlParams.get("searchQuery") || "";

        // Set the retrieved values as the initial state
        setPage(pageParam);
        setRowsPerPage(rowsPerPageParam);
        setSearchQuery(searchQueryParam);
    }, [location.search]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // Update the URL with the new page value
        navigate(
            `?page=${newPage}&rowsPerPage=${rowsPerPage}&searchQuery=${searchQuery}`
        );
    };

    const handleChangeRowsPerPage = event => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        // Update the URL with the new rowsPerPage value
        navigate(
            `?page=0&rowsPerPage=${newRowsPerPage}&searchQuery=${searchQuery}`
        );
    };

    const handleSearch = event => {
        const newSearchQuery = event.target.value;
        setSearchQuery(newSearchQuery);
        setPage(0);
        // Update the URL with the new searchQuery value
        navigate(
            `?page=0&rowsPerPage=${rowsPerPage}&searchQuery=${newSearchQuery}`
        );
    };

    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Paper
                    component="form"
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Open Tickets"
                        inputProps={{ "aria-label": "search open tickets" }}
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                    <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                    />
                </Paper>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ background: "#E8E9EB" }}>
                            <TableCell>Subject</TableCell>
                            <TableCell align="right">Ticket_id</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Priority</TableCell>
                            <TableCell align="right">
                                Solution Provider
                            </TableCell>
                            <TableCell align="right">Company</TableCell>
                            <TableCell align="right">Created_at</TableCell>
                            <TableCell align="right">Updated_at</TableCell>
                            <TableCell align="right">Updated_By</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets
                            .filter(
                                tic =>
                                    tic.status === "open" &&
                                    ((tic.title &&
                                        tic.title
                                            .toLowerCase()
                                            .includes(
                                                searchQuery.toLowerCase()
                                            )) ||
                                        (tic.ticket &&
                                            tic.ticket
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase()
                                                )) ||
                                        (tic.personName &&
                                            tic.personName
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase()
                                                )))
                            )
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(row => (
                                <TableRow
                                    key={row.guid}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                    onClick={() => {
                                        navigate(
                                            `/ticketdetail/${row.ticket}/${row.guid}`
                                        );
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.ticket}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.category}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.priority}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.personName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.companyName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {moment(row.createdOn).format(
                                            "DD/MM/YYYY h:mm:ss a"
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {moment(row.updatedOn).format(
                                            "DD/MM/YYYY h:mm:ss a"
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[7, 14, 21]}
                    component="div"
                    count={tickets.filter(tic => tic.status === "open").length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
}
