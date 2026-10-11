import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export function PostDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
        <p className="text-gray-600 mb-6">The blog post you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
     
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
        >
          &larr; Back to previous page
        </button>
        <Link 
          to="/" 
          className="text-sm font-medium px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
        >
          Home Page
        </Link>
      </div>

  
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight capitalize">
        {post.title}
      </h1>
      
      <div className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
        Written by Author ID: <span className="font-semibold text-gray-700">{post.userId}</span>
      </div>

      <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed space-y-4 text-lg">
        <p>{post.body}</p>
       
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi nesciunt voluptas sint optio natus corporis. Accusantium minima ut deserunt facere vitae corporis perferendis hic eius, magni cum repellat temporibus dolores.
        </p>
      </div>
    </article>
  );
}