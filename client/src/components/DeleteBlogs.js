import React, { useState } from "react";
import axios from "axios";
import config from "../config";

const DeleteButton = ({ blogId, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Send a delete request to the backend API
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      // Call the onDelete callback to update the UI
      onDelete();
    } catch (error) {
      // Handle errors gracefully
      console.error("Error deleting blog:", error);
      setDeleteError("Failed to delete the blog");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {deleteError && <div>Error: {deleteError}</div>}
    </div>
  );
};

export default DeleteButton;
