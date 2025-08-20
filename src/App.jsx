import './App.css'
import { useState, useEffect } from "react";


function App() {
  const [blogAPI, setBlogAPI] = useState(null);

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
        const result = await response.json();
        console.log(result);
        setBlogAPI(result);
      } catch (error) {
        console.error(error);
      }
    };

    getBlogAPI();
  }, []);

  return (
    blogAPI && (
      <>
        <p>hello world</p>
        <p>{blogAPI.blogs[0].title}</p>
      </>
    )
  );
};

export default App
