import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ButtonAppBar({ toggleDrawer }) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {location.pathname !== "/" && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    {location.pathname === "/" && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        onClick={()=>{
                            navigate('/')
                        }}
                    >
                        Ticket System
                    </Typography>
                    {location.pathname !== "/ticketform" && (
                        <Button
                            color="inherit"
                            onClick={() => navigate("/ticketform")}
                        >
                            Create New Ticket
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
