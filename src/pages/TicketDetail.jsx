import {
    Box,
    Button,
    Container,
    Divider,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Bread from "../components/Bread";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { getAssignUser, getTicketDetail, getTransferUser } from "../apicalls";

export default function TicketDetail() {
    const [commentDetails, setCommentDetails] = useState([]);
    const { ticketId,guid } = useParams();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (userGuid) => {
        setAnchorEl(null);
        getTransferUser(guid ,userGuid);
    };

    useEffect(() => {
        (async () => {
            const result = await getTicketDetail(guid);
            setCommentDetails(result.data.items);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result = await getAssignUser();
            setUsers(result.data.items);
            console.log(result.data.items);
        })();
    }, []);
    return (
        <Box>
            <Typography sx={{ p: 4, textAlign: "center" }} variant="h4">
                Ticket Detail
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Container>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Bread />
                    <Box>
                        <Button variant="contained" onClick={handleClick}>
                            Transfer Provider
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {users.map(user => {
                                return (
                                    <MenuItem
                                        onClick={()=>{
                                            handleClose(user.guid)
                                        }}
                                        key={user.guid}
                                    >
                                        {user.firstName}
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Box>
                </Box>

                <Comment commentDetails={commentDetails} setCommentDetails={setCommentDetails}/>
            </Container>
        </Box>
    );
}
