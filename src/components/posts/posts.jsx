import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../features/posts/posts.action";
const Posts = () => {
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.post.content);
  const isLoading = useSelector((state) => state.post.isLoading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    console.log("Before dispatch", contents);
    dispatch(fetchPost());
    console.log("After dispatch", contents);
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>Data is loading</h1>
      ) : (
        <div className="posts-body">
          {contents.map((content) => (
            <div key={content.id}>
              <h3>{content.title}</h3>
              <p>{content.body}</p>
            </div>
          ))}
        </div>
      )}

      {error && error}
    </div>
  );
};

export default Posts;
