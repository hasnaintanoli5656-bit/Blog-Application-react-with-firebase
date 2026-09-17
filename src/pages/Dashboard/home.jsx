import React, { useEffect, useState } from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import BlogCard from '../../components/blogCard'
import { collection, query, getDocs, doc } from "firebase/firestore";
import { db } from '../../firebase/config';


const Home = () => {
    const [allBlogs, setAllBlogs] = useState([])

    const getBlogaData = async () => {
        try {
            const q = query(collection(db, "blogs"));

            const querySnapshot = await getDocs(q);
            const blogs = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setAllBlogs(blogs)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getBlogaData()
    }, [])
    return (
        <>

            <Navbar />
            <div className='flex flex-wrap justify-between gap-5 ml-10 mt-10'>
                {allBlogs.length > 0 ? allBlogs.map((blog) => (<BlogCard />)) : "blog finding"}
            </div>

        </>
    )
}

export default Home
