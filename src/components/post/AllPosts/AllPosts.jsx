import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AllPosts.scss';
import { ModalPost } from "./ModalPost/ModalPost";
import { PostCreate } from "./PostCreate/PostCreate";
import { PostEdit } from "./PostEdit/PostEdit";

export const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editPostData, setEditPostData] = useState(null); // State to store data for editing

    const getPosts = async () => {
        try {
            const response = await axios.get("https://fs-backend-one.vercel.app/api/post/getAll");
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditPost = async (values) =>{
        try {
            const response = await axios.put("https://fs-backend-one.vercel.app/api/post/update", values);
            console.log(response.data);
            getPosts();
            setShowEdit(false); // Hide edit form after submission
        } catch (error) {
            console.error(error);
        }
    }

    const deletePost = async (postId) => {
        try {
            await axios.delete(`https://fs-backend-one.vercel.app/api/post/delete/${postId}`);
            getPosts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreatePost = async (values) => {
        try {
            const response = await axios.post("https://fs-backend-one.vercel.app/api/post/create", values);
            console.log(response.data);
            getPosts();
        } catch (error) {
            console.error(error);
        }
    }

    const openModal = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const toggleEditForm = (post) => {
        setShowEdit(!showEdit); // Toggle edit form visibility
        setEditPostData(post); // Set post data for editing
    };

    useEffect(() => {
        getPosts(); 
    }, []); 

    return(
        <div>
            <PostCreate CreatePost={handleCreatePost}></PostCreate>

            {posts.map((post) => (
                <div key={post.id} className="post__item">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <div className="post__item__btn">
                        <button onClick={() => toggleEditForm(post)} className="post__item__btn__item">Редагувати</button>
                        <button onClick={() => openModal(post)} className="post__item__btn__item">Детальна інформація</button>
                        <button onClick={() => deletePost(post.id)} className="post__item__btn__item">Видалити</button>
                    </div> 
                    {showEdit && editPostData && editPostData.id === post.id && (
                        <PostEdit EditPost={handleEditPost} post={editPostData} />
                    )}
                </div>
            ))}

            {showModal && (
                <ModalPost post={selectedPost} closeModal={() => setShowModal(false)} />
            )}
        </div>    
    )
}