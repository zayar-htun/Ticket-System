import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Menu,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getAllCategory, updateCategory } from "../../apicalls";

export default function ViewCategory() {
  const navigate = useNavigate();
  const input = useRef();
  const [categories, setCategories] = useState([]);
  const [anchorEls, setAnchorEls] = useState(Array(categories.length).fill(null));

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);

    // Set the input value to the selected category's name
    const categoryName = categories[index].name;
    input.current.value = categoryName;
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const updateCategoryName = (index, newName) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = newName;
    setCategories(updatedCategories);
  };

  const handleUpdateCategory = async (index) => {
    const newName = input.current.value;

    console.log(newName);

    try {
      await updateCategory(categories[index].guid, newName);
      updateCategoryName(index, newName);
      handleClose(index);
    } catch (error) {
      console.error("Error updating category:", error);
      // Handle error appropriately (e.g., show an error message)
    }
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
            Category List
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/createCategory`);
            }}
          >
            Add Category
          </Button>
        </Box>

        <Box sx={{ mt: 6 }}>
          {categories.map((category, index) => (
            <Box key={category.guid}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ mr: 3 }}>
                  {index + 1}. {category.name}
                </Typography>
                <IconButton onClick={(event) => handleClick(event, index)}>
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
                  <FormControl sx={{ m: 1, width: "400px" }} variant="standard">
                    <InputLabel htmlFor="edit-category-input">Edit Category</InputLabel>
                    <Input
                      inputRef={input}
                      id="edit-category-input"
                      type="text"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="update category"
                            onClick={() => handleUpdateCategory(index)}
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
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
