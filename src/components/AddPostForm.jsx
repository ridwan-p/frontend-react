import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addPost } from '../features/postsSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit handler to dispatch the addPost action
  const onSubmit = (data) => {
    const newPost = {
      title: data.title,
      body: data.body,
      userId: 1, // Mock user ID
    };

    // Dispatch the addPost action
    dispatch(addPost(newPost));

    // Reset the form after submission
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h2>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          className={`block w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Enter post title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Body Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
          Body
        </label>
        <textarea
          id="body"
          {...register('body', { required: 'Body is required' })}
          className={`block w-full p-2 border ${errors.body ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Enter post body"
          rows="4"
        ></textarea>
        {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Post
      </button>
    </form>
  );
};

export default AddPostForm;
