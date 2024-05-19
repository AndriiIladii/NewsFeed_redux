import React, { useState } from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news }) => {
  const [likes, setLikes] = useState(0);

  function handleLikes() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <ul className={styles.newsFeed}>
        {news.map((item) => (
          <li className={styles.feedItem} key={item.id}>
            <p>{item.value}</p>
            <div className={styles.postBtns}>
              <button className={styles.likeBtn} onClick={handleLikes}>
                <span>{likes}</span>
                Like
              </button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPost;
