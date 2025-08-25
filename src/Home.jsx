import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/blogs', 
          {
            mode: "cors",
            method: "GET",
            headers: {
              "Authorization": `${token}`,
            },
          },
        );

        if (response.status === 401) {
          navigate("/login", { state: { message: "Unauthorized. Please log in again" } });
        }
        
        if (response.status >= 400) {
          throw new Error("server error");
        }

        const data = await response.json();
        console.log(data);
        setBlogs(data.publishedBlogs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, [token, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (blogs.length === 0) return <p>No blog content</p>;

  return (
    <div>
      <ul>
      {blogs && blogs.length > 0 && blogs.map((blog) => {
        const link = "http://localhost:3000/blogs/" + blogs.id;
        return (
          <li key={blog.id} id={blog.id}>
            <Link to={link}>{blog.title}</Link>
          </li>
        )
      })}
      </ul>
    </div>
  );
};

export default Home;
