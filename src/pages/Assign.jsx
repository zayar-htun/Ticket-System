import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import {
    deleteAssign,
    getAllAssign,
    getAllCategory,
    getAllPerson,
    updateAssign,
} from "../apicalls";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Assign() {
    const navigate = useNavigate();
    const categoryInput = useRef();
    const personInput = useRef();
    const [categories, setCategories] = useState([]);
    const [assigns, setAssigns] = useState([]);
    const [persons, setPersons] = useState([]);
    const [anchorEls, setAnchorEls] = useState(
        Array(categories.length).fill(null)
    );

    const handleClick = (event, index) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = event.currentTarget;
        setAnchorEls(newAnchorEls);
    };

    const handleClose = index => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = null;
        setAnchorEls(newAnchorEls);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllAssign();
                setAssigns(result.data.items);
                console.log(result.data.items);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Handle error appropriately (e.g., show an error message)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllPerson();
                setPersons(result.data.items);
                console.log(result.data.items);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Handle error appropriately (e.g., show an error message)
            }
        };

        fetchData();
    }, []);

    const updateCategoryName = (index, categoryGuid, personGuid) => {
        const updatedCategories = [...assigns];
        updatedCategories[index].categoryGuid = categoryGuid;
        updatedCategories[index].personGuid = personGuid;
        setCategories(updatedCategories);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllCategory();
                setCategories(result.data.items);
                console.log(result.data.items);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Handle error appropriately (e.g., show an error message)
            }
        };

        fetchData();
    }, []);

    const handleDelete = async assignGuid => {
        try {
            // Make API call to delete the category
            await deleteAssign(assignGuid);

            // Update state to remove the deleted category
            setCategories(prevCategories =>
                prevCategories.filter(
                    category => category.assignGuid !== assignGuid
                )
            );
        } catch (error) {
            console.error("Error deleting category:", error);
            // Handle error appropriately (e.g., show an error message)
        }
    };

    const handleUpdateCategory = async index => {
        const categoryGuid = categoryInput.current.value;
        const personGuid = personInput.current.value;

        console.log(categoryGuid);

        try {
            await updateAssign(
                assigns[index].assignGuid,
                categoryGuid,
                personGuid
            );
            updateCategoryName(index, categoryGuid, personGuid);
            handleClose(index);
        } catch (error) {
            console.error("Error updating category:", error);
            // Handle error appropriately (e.g., show an error message)
        }
    };

    return (
        <Box>
            <Container sx={{ mt: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Assign List
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate(`/addAssign`);
                        }}
                    >
                        Add Assign
                    </Button>
                </Box>

                <Box sx={{ mt: 6 }}>
                    {assigns.map((category, index) => (
                        <Box key={category.assignGuid}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" sx={{ mr: 3 }}>
                                        {index + 1}. <b>Category Name : </b>
                                        {category.name}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mr: 3 }}>
                                        <b>Solution Provider : </b>
                                        {category.firstName}
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={() => {
                                        handleDelete(category.assignGuid);
                                    }}
                                >
                                    <DeleteIcon sx={{ color: "red" }} />
                                </IconButton>
                                <IconButton
                                    onClick={event => handleClick(event, index)}
                                >
                                    <EditIcon sx={{ color: "orangered" }} />
                                </IconButton>
                                <Menu
                                    id={`demo-positioned-menu-${index}`}
                                    anchorEl={anchorEls[index]}
                                    open={Boolean(anchorEls[index])}
                                    onClose={() => handleClose(index)}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                >
                                    <FormControl
                                        sx={{ m: 1, width: "400px" }}
                                        variant="standard"
                                    >
                                        <Box sx={{ mb: 2.5 }}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ mb: 1 }}
                                            >
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
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ mb: 1 }}
                                            >
                                                What is this regarding
                                            </Typography>
                                            <TextField
                                                id="outlined-select-currency"
                                                select
                                                defaultValue="Accounting"
                                                fullWidth
                                                inputRef={personInput}
                                            >
                                                {persons.map(option => (
                                                    <MenuItem
                                                        key={option.guid}
                                                        value={option.guid}
                                                    >
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Box>
                                        <Button
                                            onClick={() =>
                                                handleUpdateCategory(index)
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </FormControl>
                                </Menu>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
