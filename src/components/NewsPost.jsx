import React, { useState } from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news, handleLikes, handleShare, fileInputRef }) => {
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function handleComment(id) {
    setCommentId(id);
  }

  async function addComment() {
    if (comment !== "") {
      let image = fileInputRef.current.files[0];

      image = await getBase64(image);

      const newComment = {
        id: Date.now(),
        value: comment,
        likes: 0,
        image: image,
      };

      const updateComment = [newComment, ...comment];
      setNews(updateComment);
      setFeed("");
      image = "";
    }
  }

  return (
    <div>
      <ul className={styles.newsFeed}>
        {news.map((item) => (
          <li className={styles.feedItem} id={item.id} key={item.id}>
            <p>{item.value}</p>
            {<img src={item.image} alt="news" />}
            <div className={styles.postBtns}>
              <button
                className={styles.likeBtn}
                onClick={() => handleLikes(item.id)}
              >
                <span>{item.likes}</span>
                Like
              </button>
              <button onClick={() => handleComment(item.id)}>Comment</button>
              <button onClick={() => handleShare(item.id)}>Share</button>
            </div>
            {commentId === item.id && (
              <div>
                <input
                  className={styles.comments}
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Write a comment..."
                />
                <button onClick={addComment}>Add comment</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPost;
