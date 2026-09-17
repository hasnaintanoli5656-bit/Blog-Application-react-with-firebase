import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '../components/input'
import ButtonComponent from '../components/button'
import { uploadImageToCloudinary } from '../helper/helper.js'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { db } from '../firebase/config.js';
import { userid } from './protectedRoute.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      await addDoc(collection(db, "Blogs"), {
        imageUrl : url ,
        title : data.title,
        description : data.description,
        authorID : userid,
        createdAT : serverTimestamp()
      });
    console.log("Blog Created")
    } catch (error) {
      console.log(error)
    }
  }

  const PostBlogHandler = async () => {
    try {
      // console.log("post blog hanler chala")
      // console.log(blogForm)
      let imgUrl = await uploadImageToCloudinary(blogForm.file)
      SaveDataIntoDB(imgUrl, blogForm)
      //  console.log("Image url ya ha " , imgUrl)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <Button sx={{
        fontSize: "20px",
        fontFamily: "inheritit"
      }} onClick={handleOpen}>Create A Blog</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{
            fontSize: "19px",
            fontStyle: "inherit"
          }} id="modal-modal-title" variant="h6" component="h2">
            Create Your Blog
          </Typography>

          <Input label={"Enter Your blog Title"} type={"text"} id="title" handler={BlogInputChange} />
          <Input label={"Enter Your blog Description"} type={"text"} id="description" handler={BlogInputChange} />
          <Input label={"Choose File"} type={"file"} id="file" handler={BlogInputChange} />

          <ButtonComponent handler={PostBlogHandler} title={"create Blog"} />

        </Box>
      </Modal>
    </div>
  );
}
