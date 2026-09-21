import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Input from '../components/input';
import ButtonComponent from '../components/button';
import { uploadImageToCloudinary } from '../helper/helper.js';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/config.js';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ open, handleClose, blogData, getBlogaData }) {
  const [updatedForm, setUpdatedForm] = React.useState({
    title: blogData?.title || "",
    description: blogData?.description || "",
    file: ""
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (blogData) {
      setUpdatedForm({
        title: blogData.title || "",
        description: blogData.description || "",
        file: ""
      });
    }
  }, [blogData]);

  const handleInputChange = (key, value) => {
    setUpdatedForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateBlogHandler = async () => {
    try {
      setLoading(true);
      let imgUrl = blogData.imageUrl;
      
      // Agar user ne nayi file select ki hai toh Cloudinary par upload karenge
      if (updatedForm.file) {
        imgUrl = await uploadImageToCloudinary(updatedForm.file);
      }

      const blogRef = doc(db, "Blogs", blogData.id);
      await updateDoc(blogRef, {
        title: updatedForm.title,
        description: updatedForm.description,
        imageUrl: imgUrl
      });

      toast.success("BLOG UPDATED SUCCESSFULLY!");
      getBlogaData();
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography sx={{ fontSize: '20px', fontWeight: 700, mb: 2, color: '#1e293b' }}>
          Edit Your Blog
        </Typography>

        <Input 
          label={"Update Title"} 
          type={"text"} 
          id="title" 
          handler={handleInputChange} 
          value={updatedForm.title} 
        />
        <Input 
          label={"Update Description"} 
          type={"text"} 
          id="description" 
          handler={handleInputChange} 
          value={updatedForm.description} 
        />
        <Input 
          label={"Choose New Image (Optional)"} 
          type={"file"} 
          id="file" 
          handler={handleInputChange} 
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonComponent 
            handler={updateBlogHandler} 
            title={loading ? "Updating..." : "Update Blog"} 
          />
        </Box>
      </Box>
    </Modal>
  );
}