import { Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { createAssign, createCategory, getAllCategory, getAllPerson } from "../apicalls";
import { useNavigate } from "react-router-dom";

export default function AddAssign() {
    const categoryInput = useRef();
    const personInput = useRef();
    const navigate = useNavigate();
    const [allCategories, setAllCategories] = useState([]);
    const [persons, setPersons] = useState([]);

    const handleFormSubmit = e => {
        e.preventDefault(); // Prevent default form submission behavior

        const categoryGuid = categoryInput.current.value;
        const personGuid = personInput.current.value;

        createAssign(categoryGuid, personGuid);
        navigate(`/allAssign`);
    };

    useEffect(() => {
        (async () => {
            const result = await getAllPerson();
            setPersons(result.data.items);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result = await getAllCategory();
            setAllCategories(result.data.items);
        })();
    }, []);

    return (
        <Box>
            <Container sx={{ mt: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Create Assign
                    </Typography>

                    <form onSubmit={handleFormSubmit}>
                        <Box sx={{ mb: 2.5 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Category
                            </Typography>
                            <TextField
                                id="outlined-select-currency"
                                select
                                defaultValue="Accounting"
                                fullWidth
                                inputRef={categoryInput}
                            >
                                {allCategories.map(option => (
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
                                Person
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
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                mx: 4,
                                borderRadius: "30px",
                                fontSize: "20px",
                            }}
                        >
                            Add Category
                        </Button>
                    </form>
                </Box>
            </Container>
        </Box>
    );
}
