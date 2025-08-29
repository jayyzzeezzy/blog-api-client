import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./CommentSection.module.css";


function CommentSection({ comments, blogId }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const commentBody = e.target.commentBody.value;
    console.log(commentBody);

    try {
        const response = await fetch(
            `http://localhost:3000/blogs/${blogId}/comments`,
            {
                mode: "cors",
                method: "POST",
                headers: { 
                    "Authorization": `${token}`,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ commentBody }),
            }
        );

        if (response.status === 401) {
            navigate('/login');
        }
        
        if (response.status >= 400) {
            throw new Error("server error");
        }

        const data = await response.json();
        console.log(data);
        navigate(0);
        
    } catch (error) {
        console.log(error);
        setError(error);
    }
  }

  if (error) return <p>Server error</p>;

  return (
    <>
        <div>
            <h3>Comments</h3>
            {comments.length === 0 ? (<p>No comments yet</p>) : (
                comments.map((comment) => {
                    return (
                        <div key={comment.id} className={style.comment}>
                            <p>{comment.username}</p>
                            <p>{comment.createdAt}</p>
                            <p>{comment.body}</p>
                        </div>
                    )
                })
            )}
            
            <div>
                <h4>Leave a comment</h4>
                <form method="POST" onSubmit={(e) => handleFormSubmit(e)}>
                    <textarea 
                        name="commentBody" 
                        id="commentBody" 
                        defaultValue="What do you think about this blog?"
                        onSubmit={(e) => handleFormSubmit(e)}
                    >
                    </textarea>

                    <input type="submit" />
                </form>
            </div>
        </div>
    </>
  );
};

export default CommentSection;