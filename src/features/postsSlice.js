import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    filteredPosts: [],
    status: 'idle',
    error: null,
    searchTerm: '',
    currentPage: 0,
    postsPerPage: 10,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 0; // Reset to first page on search
      state.filteredPosts = state.allPosts.filter(post =>
        post.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        post.body.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allPosts = action.payload;
        state.filteredPosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.allPosts.unshift(action.payload); 
        state.filteredPosts.unshift(action.payload);
      });
  },
});

export const { setSearchTerm, setCurrentPage } = postsSlice.actions;

export default postsSlice.reducer;
