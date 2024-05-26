import { Button, InputLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import config from "../config";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [inputs, setInputs] = useState({ title: "", desc: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
        const data = await res.data;
        setBlog(data.blog);
        setInputs({
          title: data.blog.title || "",
          desc: data.blog.desc || "",   //change
        });
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Error fetching blog details");
      }
    };

    fetchDetails(); // Call fetchDetails inside useEffect
  }, [id]); // Include id in the dependency array

  const sendRequest = async () => {
    try {
      const res = await axios.put(`${config.BASE_URL}/api/blogs/update/${id}`, {
        title: inputs.title,
        desc: inputs.desc,  //change
      });
      return res.data;
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Error updating blog");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendRequest();
    if (data) {
      history.push("/myBlogs/");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {blog && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={3}
            display="flex"
            flexDirection="column"
            width="80%"
          >
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="desc"
              onChange={handleChange}
              value={inputs.desc}  //change
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
