import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostForm } from '../compoenets';
import service from '../appwrite/conf';

function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPost(slug).then((response) => {
      setPost(response);
      setLoading(false);
    }).catch((error) => {
      console.error('EditPost :: getPost :: error', error);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}

export default EditPost;