import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";



export default function Bread() {
    const { ticketId,guid } = useParams();
    return (
        <div role="presentation" >
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Ticket
                </Link>
                <Typography color="text.primary">{ticketId}</Typography>
            </Breadcrumbs>
        </div>
    );
}
