import './App.css'
import { useState, useEffect } from "react";


function App() {
  const [blogAPI, setBlogAPI] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogAPI = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/admin/blogs', 
          {
            mode: "cors",
            method: "GET",
            headers: {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc1NTQxMjc3MTU3MywiaXNBdXRob3IiOnRydWUsImV4cCI6MTc1NTQxMzk4MTE3M30.yg2f7LdoN5aHjrXwNdkfrW7Gx6uJSfZahlIMDuN5CH0",
            },
          },
        );

        if (response.status >= 400) {
          throw new Error("server error");
        }

        const result = await response.json();
        console.log(result);
        setBlogAPI(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getBlogAPI();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  if (blogAPI.blogs.length === 0) return <p>No blog content</p>;

  return (
    <>
      <p>hello world</p>
      {blogAPI && blogAPI.blogs.length > 0 && <p>{blogAPI.blogs[0].title}</p>}
    </>
  );
};

export default App
