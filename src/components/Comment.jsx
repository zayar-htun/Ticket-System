import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    IconButton,
    Input,
    InputAdornment,
    TextField,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCommentIcon from "@mui/icons-material/AddComment";
import moment from "moment";
import { getUploadComment, getUploadFile } from "../apicalls";
import { useParams } from "react-router-dom";
const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

export default function Comment({ commentDetails, setCommentDetails }) {
    const input = React.useRef();
    const [photo, setPhoto] = React.useState("");
    const [uploadData, setUploadData] = React.useState("");
    const { guid } = useParams();
    const [refresh, setRefresh] = React.useState(false);

    const getFile = async () => {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: "Images",
                    accept: {
                        "image/*": [".png", ".jpeg", ".jpg"],
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        });

        return await fileHandle.getFile();
    };

    const changePhoto = async () => {
        try {
            const file = await getFile();
            setPhoto(URL.createObjectURL(file));

            // const fileName =
            //     file.type === "image/png" ? `-photo.png` : `-photo.jpg`;

            const formData = new FormData();
            formData.append("file", file);

            const result = await getUploadFile(file);
            setUploadData(result);
            console.log(result);
            console.log("File upload successful:", result.data);
        } catch (error) {
            console.error("Error during file upload:", error);
            // Handle the error appropriately, e.g., display a user-friendly message
        }
    };

    const addComment = async () => {
        try {
            const text = input.current.value;
            const result = await getUploadComment(guid, text, uploadData);
            setUploadData("");
            input.current.value = "";

            // Trigger auto-refresh by updating the refresh state
            setRefresh(prevRefresh => !prevRefresh);
        } catch (error) {
            console.error("Error during comment upload:", error);
            // Handle the error appropriately
        }
    };
    return (
        <Box>
            {commentDetails.map((com, index) => (
                <Box sx={{ display: "flex", m: 2 }} key={com.guid}>
                    <Avatar sx={{ mr: 2 }}>
                        <PersonIcon />
                    </Avatar>

                    <Card variant="outlined" sx={{ width: "100%" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{ mr: 1 }}
                                >
                                    {com.username}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {moment(com.updatedCommentOn).format(
                                        "DD/MM/YYYY h:mm:ss a"
                                    )}
                                </Typography>
                            </Box>
                            <Accordion
                                sx={{ boxShadow: 0.2 }}
                                defaultExpanded={
                                    index === commentDetails.length - 1
                                }
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant="body2" sx={{ my: 1 }}>
                                        <span>
                                            <b>Ticket Title : </b>
                                        </span>
                                        {com.title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{com.description}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Box>
            ))}

            <Box sx={{ mb: 2.5 }}>
                <Button startIcon={<AttachFileIcon />} onClick={changePhoto}>
                    Attach File
                </Button>
                {uploadData && <Typography>File Uploaded</Typography>}
            </Box>
            <form
                onSubmit={e => {
                    e.preventDefault();

                    addComment();
                }}
            >
                {/* <Input
                    inputRef={input}
                    sx={{ fontSize: "16px", py: 2 }}
                    placeholder="Your review comment "
                    multiline
                    fullWidth
                    variant="standard"
                    maxRows={4}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <AddCommentIcon sx={{ color: "info" }} />
                            </IconButton>
                        </InputAdornment>
                    }
                /> */}
                <Box sx={{ display: "flex" }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        inputRef={input}
                        multiline
                        fullWidth
                        rows={4}
                    />
                    <Button type="submit">Add Comment</Button>
                </Box>
            </form>
        </Box>
    );
}
