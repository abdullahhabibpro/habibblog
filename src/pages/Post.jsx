import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../appwrite/conf';
import { Button } from '../compoenets';
import { useSelector } from 'react-redux';

function Post() {
  const { slug } = useParams();
  
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
 
  const userId = useSelector((state)=> state.auth.userData.$id) || null
 
  
  console.log(slug.toString())

  useEffect(() => {
    service.getPost(slug).then((response) => {
      setPost(response);
      setLoading(false);
    }).catch((error) => {
      console.error('Post :: getPost :: error', error);
      setLoading(false);
    });
  }, [slug]);


  const handleDelete = async () => {
    try {
      await service.deletePost(slug);
      if (post.featuredImage) {
        await service.deleteFile(post.featuredImage);
      }
      navigate('/all-posts');
    } catch (error) {
      console.error('Post :: deletePost :: error', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.featuredimage && (
        <img
          src={service.getFilePreview(post.featuredimage)}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {authStatus && post.userid === userId && (
  <div className="flex gap-4 mt-6">
    <Button
      className="bg-blue-600 text-white hover:bg-blue-700"
      onClick={() => navigate(`/edit-post/${slug}`)}
    >
      Edit Post
    </Button>
    <Button
      className="bg-red-600 text-white hover:bg-red-700"
      onClick={handleDelete}
    >
      Delete Post
    </Button>
  </div>
)}
    </div>
  );
}

export default Post;