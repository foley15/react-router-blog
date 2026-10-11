import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchedPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const result = await response.json();
        setPosts(result.slice(0, 10)); // Limiting to 10 for a cleaner display
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchedPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600 font-medium">
        Error loading posts: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Latest Blog Posts</h1>
      </header>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              <Link to={`/posts/${post.id}`} className="hover:text-indigo-600 transition">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {post.body}
            </p>
            <Link
              to={`/posts/${post.id}`}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              View Details &rarr;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}