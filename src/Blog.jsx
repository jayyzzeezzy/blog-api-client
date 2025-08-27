import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

function Blog() {
  const token = localStorage.getItem('token');
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/blogs/${blogId}`,
                {
                    mode: "cors",
                    method: "GET",
                    headers: {
                        "Authorization": `${token}`,
                    },
                },
            );

            if (response.status === 401) {
                return <Navigate to='/login' />;
            }

            if (response.status >= 400) {
                throw new Error("server error");
            }

            const data = await response.json();
            console.log(data);
            setBlog(data.blog);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    getBlog();
  }, [token, blogId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!blog) return <p>No blog content</p>;

  return (
    <>
      {blog && <div>
        <h1>{blog.title}</h1>
        <p>{blog.createdAt}</p>
        <p>By: James</p>
        <p>{blog.body}</p>

        <div>
            <h3>Comments</h3>
            {blog.comments.length === 0 ? (<p>No comments yet</p>) : (
                blog.comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.createdAt}</p>
                            <p>{comment.body}</p>
                        </div>
                    )
                })
            )}
        </div>

        </div>}
    </>
  );
};

export default Blog;