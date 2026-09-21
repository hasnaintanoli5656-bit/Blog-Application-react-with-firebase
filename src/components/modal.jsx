import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '../components/input'
import ButtonComponent from '../components/button'
import { uploadImageToCloudinary } from '../helper/helper.js'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { db, auth } from '../firebase/config.js';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/navbar';
import Footer from './footer.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export default function CreateBlog() {
  const [open, setOpen] = React.useState(true); // Automatically open modal or use button toggle
  const [loading, setLoading] = React.useState(false);
  
  const [blogForm, setBlogForm] = React.useState({
    title: "",
    description: "",
    file: ""
  })

  const BlogInputChange = (key, value) => {
    setBlogForm((prev) => ({ ...prev, [key]: value }))
  }

  const SaveDataIntoDB = async (url, data) => {
    try {
      const currentUser = auth.currentUser;
      await addDoc(collection(db, "Blogs"), {
        imageUrl: url,
        title: data.title,
        description: data.description,
        authorID: currentUser ? currentUser.uid : "",
        createdAT: serverTimestamp()
      });
      toast.success("BLOG CREATED SUCCESSFULLY!");
      setBlogForm({ title: "", description: "", file: "" });
    } catch (error) {
      console.log(error);
      toast.error("Error saving blog");
    } finally {
      setLoading(false);
    }
  }

  const PostBlogHandler = async () => {
    if (!blogForm.title || !blogForm.description || !blogForm.file) {
      toast.warning("Please fill all fields and select an image!");
      return;
    }

    try {
      setLoading(true);
      let imgUrl = await uploadImageToCloudinary(blogForm.file);
      await SaveDataIntoDB(imgUrl, blogForm);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Image upload failed");
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* <Navbar /> */}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 70px)' }}>
        <Box sx={{
          width: '450px',
          bgcolor: 'background.paper',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          p: 4,
        }}>
          <Typography sx={{ fontSize: '22px', fontWeight: 800, mb: 1, color: '#0f172a' }}>
            Create a New Blog ✍️
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#64748b', mb: 3 }}>
            Share your thoughts and stories with the world.
          </Typography>

          <Input label={"Enter Your Blog Title"} type={"text"} id="title" handler={BlogInputChange} value={blogForm.title} />
          <Input label={"Enter Your Blog Description"} type={"text"} id="description" handler={BlogInputChange} value={blogForm.description} />
          <Input label={"Choose Cover Image"} type={"file"} id="file" handler={BlogInputChange} />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonComponent handler={PostBlogHandler} title={loading ? "Posting..." : "Publish Blog"} />
          </Box>
        </Box>
      </Box>
      <ToastContainer />
      <Footer />
    </Box>
  );
}