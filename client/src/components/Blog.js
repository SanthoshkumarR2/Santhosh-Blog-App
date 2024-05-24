import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";

const Blogs = ({ title, desc, img, user, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${id}`);
      setIsDeleted(true);
      navigate("/blogs");
    } catch (err) {
      setError("Failed to delete the blog");
      console.error("Error deleting blog:", err);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleEdit}>
            <ModeEditOutlineIcon color="warning" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {user ? user.charAt(0) : ""}
          </Avatar>
        }
        title={title}
      />
      <CardMedia component="img" height="194" image={img} alt={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>{user}</b>: {desc}
        </Typography>
        {error && (
          <Typography variant="body2" color="error" textAlign="center">
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Blogs;
