import React, { useState, useEffect } from 'react';
import { PostCard } from '../compoenets'; // Fixed typo in import path
import service from '../appwrite/conf';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite'; // Import Appwrite Query class

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!userData?.$id) {
          setError('You must be logged in to view your posts.');
          setLoading(false);
          return;
        }

        // Fetch posts where userId matches the authenticated user's ID
        const response = await service.getPosts([Query.equal('userid', userData.$id)]);
        if (response) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error('AllPosts :: fetchUserPosts :: error', error);
        setError(error.message || 'Failed to fetch your posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Posts</h1>
      {error && (
        <div className="mb-6 text-red-600 bg-red-100 p-4 rounded-lg">
          {error}
        </div>
      )}
      {posts.length === 0 && !error ? (
        <p className="text-gray-600">You haven't created any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPosts;