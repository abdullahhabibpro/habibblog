import React from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/conf';

export default function PostCard({ $id, title, featuredimage }) {
  const imageUrl = featuredimage ? service.getFilePreview(featuredimage) : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className="block p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200 bg-white">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">Click to read more...</p>
      </div>
    </Link>
  );
}
