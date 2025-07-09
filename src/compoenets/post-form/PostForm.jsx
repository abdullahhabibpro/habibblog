import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../index';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../../appwrite/conf';

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  // Handle image preview
  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl); // Cleanup on unmount or change
    }
  };

  const submit = async (data) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    setError(null);

    try {
      if (!userData?.$id) {
        setError('You must be logged in to create a post.');
        return;
      }

      let fileId = post?.featuredimage || null;

      // Upload new image if provided
      if (data.image?.[0] instanceof File) {
        const file = await service.uploadFile(data.image[0]);
        fileId = file?.$id;

        // Delete old image if updating
        if (post && post.featuredimage && post.featuredimage !== fileId) {
          await service.deleteFile(post.featuredimage);
        }
      } else if (!post) {
        setError('Featured image is required for new posts.');
        return;
      }

      const payload = {
        title: data.title,
        content: data.content,
        featuredimage: fileId,
        status: data.status,
      };

      let savedPost;
      if (post) {
        savedPost = await service.updatePost(post.$id, payload);
      } else {
        savedPost = await service.createPost({ ...payload, userid: userData.$id });
      }

      if (savedPost) {
        navigate(`/post/${savedPost.$id}`);
      } else {
        // If post creation/update fails, delete the uploaded image
        if (fileId && data.image?.[0] instanceof File) {
          await service.deleteFile(fileId);
        }
        setError('Failed to save post. Please try again.');
      }
    } catch (error) {
      console.error('PostForm submit error:', error);
      // Delete uploaded image if post creation/update fails
      if (data.image?.[0] instanceof File && fileId) {
        await service.deleteFile(fileId);
      }
      setError(error.message || 'Failed to save post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Cleanup image preview URL on component unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-4">
      {error && <div className="w-full px-4 mb-4 text-red-600">{error}</div>}

      <div className="w-full lg:w-2/3 px-4 mb-8">
        <Input
          label="Title"
          placeholder="Enter post title"
          className="mb-4"
          {...register('title', { required: 'Title is required' })}
        />
        <Input
          label="Slug"
          placeholder="Enter post slug"
          className="mb-4"
          {...register('slug', { required: 'Slug is required' })}
          onInput={(e) =>
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>

      <div className="w-full lg:w-1/3 px-4">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post && 'Featured image is required for new posts' })}
          onChange={handleImagePreview} // Show preview on file selection
        />

        {/* Show image preview */}
        {(imagePreview || (post && post.featuredimage)) && (
          <div className="w-full mb-4">
            <img
              src={imagePreview || service.getFilePreview(post.featuredimage)}
              alt={post?.title || 'Featured'}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: 'Status is required' })}
        />
        <Button
          type="submit"
          disabled={isSubmitting} // Disable button during submission
          className={`w-full ${
            post ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          } text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}