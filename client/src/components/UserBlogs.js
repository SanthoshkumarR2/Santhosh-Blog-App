// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Blog from "./Blog";
// import { makeStyles } from "@mui/styles";
// import config from "../config";
// import { useHistory } from "react-router-dom"; // Import useHistory

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     margin: "20px auto",
//     width: "100%",
//     maxWidth: "1200px",
//     padding: "0 20px",
//   },
//   blogContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "10px",
//     marginBottom: "20px",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "800px",
//   },
//   noBlogsMessage: {
//     fontSize: "18px",
//     color: "#666",
//   },
// }));

// const UserBlogs = () => {
//   const classes = useStyles();
//   const [user, setUser] = useState(null);
//   const id = localStorage.getItem("userId");
//   const history = useHistory(); // Initialize useHistory


//   useEffect(() => {
//     const fetchUserBlogs = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Error fetching user blogs:", error);
//       }
//     };

//     fetchUserBlogs();
//   }, [id]);

//   const handleDelete = async (blogId) => {
//     try {
//       await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
//       const response = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//     }
//   };

//   const handleEdit = (blogId) => {
//     // Redirect to the edit page for the specified blogId
//     history.push(`/editBlog/${blogId}`);
//   };

//   return (
//     <div className={classes.container}>
//       <h1>heyy!</h1>
//       {user && user.blogs && user.blogs.length > 0 ? (
//         user.blogs.map((blog) => (
//           <div key={blog._id} className={classes.blogContainer}>
//             <Blog
//               id={blog._id}
//               isUser={true}
//               title={blog.title}
//               desc={blog.desc} //change
//               img={blog.img} //change
//               user={user.name} // change
//               onDelete={() => handleDelete(blog._id)}
//               onEdit={() => handleEdit(blog._id)} // Pass the handleEdit function
//             />
//           </div>
//         ))
//       ) : (
//         <p className={classes.noBlogsMessage}>No blogs found.</p>
//       )}
//     </div>
//   );
// };

// export default UserBlogs;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";
import { makeStyles } from "@mui/styles";
import config from "../config";
import { useHistory } from "react-router-dom";

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
  noBlogsMessage: {
    fontSize: "18px",
    color: "#666",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const id = localStorage.getItem("userId");
  const history = useHistory();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };

    fetchUserBlogs();
  }, [id]);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      const response = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (blogId) => {
    console.log("heyy!")
    history.push(`/myBlog/${blogId}`);
  };

  return (
    <div className={classes.container}>
      <h1>Your Blogs</h1>
      {user && user.blogs && user.blogs.length > 0 ? (
        user.blogs.map((blog) => (
          <div key={blog._id} className={classes.blogContainer}>
            <Blog
              id={blog._id}
              isUser={true}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={user.name}
              onDelete={() => handleDelete(blog._id)}
              onEdit={() => handleEdit(blog._id)}
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
