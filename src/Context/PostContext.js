import React, { createContext, useState } from 'react'

const PostContext = createContext();

function PostProvider({ children }) {
  const [post, setPost] = useState(null);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}

export { PostContext, PostProvider };