import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import BlogCard from '../../components/blogCard';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
import { Box, CircularProgress, Typography } from '@mui/material';
import Footer from "../../components/footer"
const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBlogaData = async () => {
        try {
            const q = query(collection(db, "Blogs"));
            const querySnapshot = await getDocs(q);

            const blogs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setAllBlogs(blogs);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogaData();
    }, []);

    return (
        <>
        <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
            <Navbar />

            <Box sx={{ maxWidth: '100%', margin: '0 auto', padding:"7%", pt: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 4, fontFamily: 'Poppins, sans-serif' }}>
                    Explore Latest Blogs 🚀
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent : "space-around", mt: 10 }}>
                        <CircularProgress sx={{ color: '#6366f1' }} />
                    </Box>
                ) : allBlogs.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 7,  }}>
                        {allBlogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                blog={blog}
                                getBlogaData={getBlogaData}
                            />
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <Typography sx={{ fontSize: '18px', color: '#64748b' }}>No blogs found. Be the first to create one!</Typography>
                    </Box>
                )}
            </Box>
            
        </Box>
        <Footer />
        </>
    );
};

export default Home;