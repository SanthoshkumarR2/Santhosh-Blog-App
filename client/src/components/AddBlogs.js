// import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import config from "../config";
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useStyles } from "./utils";

// const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

// const AddBlogs = () => {
//   const classes = useStyles();
//   const history = useHistory();
//   const [inputs, setInputs] = useState({
//     title: "",
//     desc: "",
//     img: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const sendRequest = async () => {
//     try {
//       const res = await axios.post(`${config.BASE_URL}/api/add`, {
//         title: inputs.title,
//         desc: inputs.desc,
//         img: inputs.img,
//         user: localStorage.getItem("userId"),
//       });
//       return res.data;
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//       console.error("Error in sendRequest:", err.response || err.message || err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error state
//     if (!inputs.title || !inputs.desc || !inputs.img) {
//       setError("All fields are required");
//       return;
//     }
//     const data = await sendRequest();
//     if (data) {
//       console.log("Blog added successfully:", data);
//       history.push("/blogs");
//     } else {
//       setError("Failed to add the blog");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Box
//           borderRadius={10}
//           boxShadow="10px 10px 20px #ccc"
//           padding={3}
//           margin="auto"
//           marginTop={3}
//           display="flex"
//           flexDirection="column"
//           width="80%"
//         >
//           <Typography
//             className={classes.font}
//             padding={3}
//             color="grey"
//             variant="h2"
//             textAlign="center"
//           >
//             Post Your Blog
//           </Typography>
//           {error && (
//             <Typography color="error" textAlign="center">
//               {error}
//             </Typography>
//           )}
//           <InputLabel className={classes.font} sx={labelStyles}>
//             Title
//           </InputLabel>
//           <TextField
//             className={classes.font}
//             name="title"
//             onChange={handleChange}
//             value={inputs.title}
//             margin="normal"
//             variant="outlined"
//             required
//           />
//           <InputLabel className={classes.font} sx={labelStyles}>
//             Description
//           </InputLabel>
//           <TextareaAutosize
//             className={classes.font}
//             name="desc"
//             onChange={handleChange}
//             minRows={10}
//             value={inputs.desc}
//             style={{
//               margin: "auto",
//               width: "100%",
//               padding: "10px",
//               fontSize: "16px",
//               borderRadius: "4px",
//               borderColor: "#ccc",
//             }}
//             required
//           />
//           <InputLabel className={classes.font} sx={labelStyles}>
//             Image URL
//           </InputLabel>
//           <TextField
//             className={classes.font}
//             name="img"
//             onChange={handleChange}
//             value={inputs.img}
//             margin="normal"
//             variant="outlined"
//             required
//           />
//           <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" type="submit">
//             Submit
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// };

// export default AddBlogs;

import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import config from "../config";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlogs = () => {
  const classes = useStyles();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.desc,
        img: inputs.img,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => history.push("/blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            className={classes.font}
            padding={3}
            color="grey"
            variant="h3"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextareaAutosize
            className={classes.font}
            name="desc"
            onChange={handleChange}
            minRows={10}
            margin="normal"
            variant="outlined"
            value={inputs.desc}
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="img"
            onChange={handleChange}
            value={inputs.img}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlogs;