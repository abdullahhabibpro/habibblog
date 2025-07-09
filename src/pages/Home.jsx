import React, { useState, useEffect } from 'react';
import { PostCard } from '../compoenets';
import service from '../appwrite/conf';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents);
      }
      setLoading(false);
    }).catch((error) => {
      console.error('Home :: getPosts :: error', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{posts.map((post) => {
  const previewUrl = service.getFilePreview(post.featuredimage);
  console.log(previewUrl);
  return (
    <PostCard
      key={post.$id}
      $id = {post.$id}
      title={post.title}
      featuredimage={post.featuredimage}
    />
  );
})}
        </div>
      )}
      
    </div>
  );
}

export default Home;