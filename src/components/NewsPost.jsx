import React from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news, setNews }) => {
  function handleLikes(id) {
    let updateLikes = news.map((item) =>
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setNews(updateLikes);
  }

  function handleShare(id) {
    const url = `https://localhost:3000/#${id}`;
    const el = document.createElement("textarea");
    el.value = url;

    document.body.appendChild(el);
    el.select();

    document.execCommand("copy");

    console.log("The data copied successfully! press `ctrl+v` to see output");
    document.body.removeChild(el);
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
                <span>{item.likes}</span>
                Like
              </button>
              <button>Comment</button>
              <button onClick={() => handleShare(item.id)}>Share</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPost;
