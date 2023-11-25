import {
    Drawer,
    Box,
    IconButton,
    Button,
    Menu,
    MenuItem,
    ListItemText,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export default function MainDrawer({ showDrawer, toggleDrawer }) {
    const navigate = useNavigate();

    return (
        <div>
            <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
                <Box sx={{ width: 270, backgroundColor: "transparent" }}>
                    <Box sx={{ p: "16px" }}>
                        <IconButton
                            onClick={() => {
                                toggleDrawer();
                            }}
                        >
                            <ClearIcon
                                sx={{
                                    color: "#141414",
                                    width: "24px",
                                    height: "24px",
                                }}
                            />
                        </IconButton>
                    </Box>
                    <Box>
                        <List>
                            <ListItem
                                disablePadding
                                sx={{bgcolor:"#E6E6E6"}}
                                onClick={() => {
                                    navigate(`/allCategories`);
                                    toggleDrawer();
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CategoryIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Category" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                disablePadding
                                sx={{bgcolor:"#E6E6E6",mt:1}}
                                onClick={() => {
                                    navigate(`/allAssign`);
                                    toggleDrawer();
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AssignmentIndIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Assign" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}
