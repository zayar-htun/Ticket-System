import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { createCategory } from "../apicalls";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
    const nameRef = useRef();
    const prefixRef = useRef();
    const navigate = useNavigate();

    const handleFormSubmit = e => {
        e.preventDefault(); // Prevent default form submission behavior

        const name = nameRef.current.value;
        const prefix = prefixRef.current.value;

        createCategory(name, prefix);
        navigate(`/allCategories`);
    };

    return (
        <Box>
            <Container sx={{ mt: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Create Category
                    </Typography>

                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            inputRef={nameRef}
                            fullWidth
                            sx={{ mt: 4 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Prefix"
                            variant="outlined"
                            inputRef={prefixRef}
                            fullWidth
                            sx={{ my: 4 }}
                        />
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
