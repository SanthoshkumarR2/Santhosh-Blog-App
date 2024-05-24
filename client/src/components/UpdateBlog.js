import React, { useState } from 'react';
import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const UpdateBlog = () => {
  const [formData, setFormData] = useState({
    email: '',
    select: '',
    multiSelect: [],
    textarea: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { value } = e.target;
    // Splitting the value if it's a string to handle multiSelect properly
    setFormData((prev) => ({
      ...prev,
      multiSelect: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" component="h2" mb={3}>Update Blog</Typography>
      <div className="FormControl">
        <InputLabel htmlFor="email">Email address</InputLabel>
        <TextField
          type="email"
          id="email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          margin="normal"
        />
      </div>
      <div className="FormControl">
        <InputLabel htmlFor="select">Example select</InputLabel>
        <Select
          id="select"
          name="select"
          fullWidth
          value={formData.select}
          onChange={handleChange}
          margin="normal"
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="FormControl">
        <InputLabel htmlFor="multiSelect">Example multiple select</InputLabel>
        <Select
          id="multiSelect"
          name="multiSelect"
          fullWidth
          multiple
          value={formData.multiSelect}
          onChange={handleMultiSelectChange}
          margin="normal"
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="FormControl">
        <InputLabel htmlFor="textarea">Example textarea</InputLabel>
        <TextField
          id="textarea"
          name="textarea"
          fullWidth
          multiline
          rows={3}
          value={formData.textarea}
          onChange={handleChange}
          placeholder="Type your text here"
          margin="normal"
        />
      </div>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default UpdateBlog;
