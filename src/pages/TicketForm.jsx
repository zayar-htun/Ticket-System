import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useEffect, useRef, useState } from "react";
import {
    getAllCategory,
    getAllPriority,
    getUploadFile,
    getUploadTicket,
} from "../apicalls";
export default function TicketForm() {
    const navigate = useNavigate();
    const [priorities, setPriorities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const titleInput = useRef();
    const descriptionInput = useRef();
    const categoryInput = useRef();
    const priorityInput = useRef();

    const [uploadData, setUploadData] = useState("");

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

    useEffect(() => {
        (async () => {
            const result = await getAllCategory();
            setCategories(result.data.items);
            console.log(result.data.items);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result = await getAllPriority();
            setPriorities(result.data.items);
            console.log(result.data.items);
        })();
    }, []);
    

    const handleFormSubmit = e => {
        e.preventDefault(); // Prevent default form submission behavior

        const title = titleInput.current.value;
        const description = descriptionInput.current.value;
        const category = categoryInput.current.value;
        const priority = priorityInput.current.value;

        getUploadTicket(title, description, category, priority,uploadData);
        navigate(`/`);

        console.log(title);
        console.log(description);
        console.log(category);
        console.log(priority);
    };
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 4,
                }}
            >
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowBackIosIcon
                        fontSize="inherit"
                        sx={{ color: "blue" }}
                    />
                </IconButton>
                <Typography variant="h5">Open a support ticket</Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />
            <Container sx={{ mb: 20 }}>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis dolorem rerum eaque. Quo perferendis aperiam quas iste
                    doloremque excepturi laudantium sit laborum quod, quidem hic
                    harum sequi quam nobis temporibus!
                </Typography>
                <form onSubmit={handleFormSubmit}>
                    <Box sx={{ mt: 4 }}>
                        <Box sx={{ mb: 2.5 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Title(required)
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                inputRef={titleInput}
                            />
                        </Box>
                        <Box sx={{ mb: 2.5 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                What is this regarding
                            </Typography>
                            <TextField
                                id="outlined-select-currency"
                                select
                                defaultValue="Accounting"
                                fullWidth
                                inputRef={categoryInput}
                            >
                                {categories.map(option => (
                                    <MenuItem
                                        key={option.guid}
                                        value={option.guid}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        <Box sx={{ mb: 2.5 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                What is your priority
                            </Typography>
                            <TextField
                                id="outlined-select-currency"
                                select
                                defaultValue=""
                                fullWidth
                                inputRef={priorityInput}
                            >
                                {priorities.map(option => (
                                    <MenuItem
                                        key={option.guid}
                                        value={option.guid}
                                    >
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 2.5 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Description(required)
                            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                fullWidth
                                inputRef={descriptionInput}
                            />
                        </Box>
                        <Box sx={{ mb: 2.5 }}>
                            <Button
                                startIcon={<AttachFileIcon />}
                                onClick={changePhoto}
                            >
                                Attach File
                            </Button>
                            {uploadData && (
                                <Typography>File Uploaded</Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Button variant="text" sx={{ mr: 4 }}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            Open Ticket
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
}
