import React, { useState } from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news, setNews }) => {
  const [likes, setLikes] = useState(0);

  function handleLikes(id) {
    let updateLikes = news.map((item) =>
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setNews(updateLikes);
  }

  return (
    <div>
      <ul className={styles.newsFeed}>
        {news.map((item) => (
          <li className={styles.feedItem} key={item.id}>
            <p>{item.value}</p>
            <div className={styles.postBtns}>
              <button
                className={styles.likeBtn}
                onClick={() => handleLikes(item.id)}
              >
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
