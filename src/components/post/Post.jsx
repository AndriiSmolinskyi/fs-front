import { useState, useEffect, useContext } from "react"
import axios from 'axios';
import { AllPosts } from "./AllPosts/AllPosts";

export const Post = () => {
    
    return(
        <div>
            <AllPosts></AllPosts>
        </div>   
    )
}