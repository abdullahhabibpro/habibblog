import React from 'react';
import { PostForm } from '../compoenets';

function AddPost() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create a New Post</h1>
      <PostForm />
    </div>
  );
}

export default AddPost;