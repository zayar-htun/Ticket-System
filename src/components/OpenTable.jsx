import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function OpenTable({tickets}) {
    const navigate = useNavigate();
    const [items, setItems] = React.useState([
        {
            guid: 1,
            name: "Bar Nyar Ticket",
            ticket: "1111",
            category: "accounting",
            priority: 6,
            solutionProvider:"Zay Yar Tun",
            createdAt: "28/4/2000",
            updatedAt: "29/4/2023",
            updatedBy: "U Zay",
        },
        {
            guid: 2,
            name: "Bar Bar Ticket",
            ticket: "1111",
            category: "billing",
            priority: 9,
            solutionProvider:"Kyaw Sithu Win",
            createdAt: "28/4/2000",
            updatedAt: "29/4/2023",
            updatedBy: "U Zay",
        },
        {
            guid: 3,
            name: "Nyar Nyar Ticket",
            ticket: "1111",
            category: "software ",
            priority: 12,
            solutionProvider:"Maung Win",
            createdAt: "28/4/2000",
            updatedAt: "29/4/2023",
            updatedBy: "U Zay",
        },
    ]);


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{ background: "#E8E9EB" }}>
                        <TableCell>Subject</TableCell>
                        <TableCell align="right">Ticket_id</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Priority</TableCell>
                        <TableCell align="right">Solution Provider</TableCell>
                        <TableCell align="right">Company</TableCell>
                        <TableCell align="right">Created_at</TableCell>
                        <TableCell align="right">Updated_at</TableCell>
                        <TableCell align="right">Updated_By</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.filter(tic => tic.status === "open").map(row => (
                        <TableRow
                            key={row.guid}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                            onClick={() => {
                                navigate(`/ticketdetail/${row.ticketId}/${row.guid}`);
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.ticket}</TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                            <TableCell align="right">{row.priority}</TableCell>
                            <TableCell align="right">{row.personName}</TableCell>
                            <TableCell align="right">{row.companyName}</TableCell>
                            <TableCell align="right">{moment(row.createdOn).format('DD/MM/YYYY h:mm:ss a')}</TableCell>
                            <TableCell align="right">{moment(row.updatedOn).format('DD/MM/YYYY h:mm:ss a')}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
