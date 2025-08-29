import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";

function Blog() {
  const token = localStorage.getItem('token');
  const navigate= useNavigate();
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
                navigate('/login');
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
  }, [token, blogId, navigate]);

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

        <br />
        
        <CommentSection comments={blog.comments} blogId={blogId} />
        </div>}
    </>
  );
};

export default Blog;