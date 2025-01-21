import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { getAllPosts } from "./posts.type";


export const fetchPost = createAsyncThunk(getAllPosts,
    async () => {
        const res = await axios('https://jsonplaceholder.typicode.com/posts')
        const data = res.data;
        console.log("res data",data)
        return data;
    }
)