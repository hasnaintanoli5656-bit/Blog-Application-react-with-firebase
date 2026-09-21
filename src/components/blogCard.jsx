import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config.js";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import EditModal from './editmodal.jsx';

export default function BlogCard({ blog, getBlogaData }) {
  const [userId, setUserId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
      if (CurrentUser) {
        setUserId(CurrentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const deleteHandler = async (blogid) => {
    try {
      await deleteDoc(doc(db, "Blogs", blogid));
      toast.success("BLOG DELETED SUCCESSFULLY");
      getBlogaData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Card sx={{
        width: "360px",
        height : "auto",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: "0 12px 30px rgba(0,0,0,0.1)"
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
      }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#6366f1', fontWeight: 'bold' }}>
              {blog.username ? blog.username.charAt(0).toUpperCase() : "H"}
            </Avatar>
          }
          title={<Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#1e293b' }}>{blog.title}</Typography>}
          subheader={<Typography sx={{ fontSize: '11px', color: '#64748b' }}>Community Post</Typography>}
        />

        <CardMedia
          sx={{ height: "300px", width: "100%", objectFit: "cover" }}
          component="img"
          image={blog.imageUrl}
          alt={blog.title}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: "#475569", fontSize: "14px", lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {blog.description}
          </Typography>
        </CardContent>

        {blog.authorID === userId && (
          <CardActions disableSpacing sx={{ justifyContent: 'flex-end', px: 2, pb: 1, borderTop: '1px solid #f1f5f9' }}>
            <IconButton size="small" onClick={() => setOpenEdit(true)} sx={{ color: '#3b82f6', '&:hover': { backgroundColor: '#eff6ff' } }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => deleteHandler(blog.id)} sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fef2f2' } }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </CardActions>
        )}
      </Card>

      {/* Edit Modal Component */}
      <EditModal 
        open={openEdit} 
        handleClose={() => setOpenEdit(false)} 
        blogData={blog} 
        getBlogaData={getBlogaData} 
      />

      <ToastContainer />
    </>
  );
}