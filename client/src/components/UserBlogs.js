/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blog";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "100%",
    maxWidth: "1200px",
    padding: "0 20px",
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "800px",
  },
  blogImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
    
  },
  editButton: {
    background: "#f0f0f0",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "red",
    cursor: "pointer",
  },
  noBlogsMessage: {
    fontSize: "18px",
    color: "#666",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };

    sendRequest();
  }, [id]);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      setUser(res.data.user);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className={classes.container}>
      {user && user.blogs && user.blogs.length > 0 ? (
        user.blogs.map((blog) => (
          <div key={blog._id} className={classes.blogContainer}>
            <Blogs
              id={blog._id}
              isUser={true}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={user.name}
            />
            
          </div>
        ))
      ) : (
        <p className={classes.noBlogsMessage}>No blogs found.</p>
      )}
    </div>
  );
};

export default UserBlogs;
