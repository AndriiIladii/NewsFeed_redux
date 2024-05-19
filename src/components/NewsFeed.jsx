import React, { useState } from "react";
import * as styles from "./NewsFeed.module.css";

const NewsFeed = () => {
  const [feed, setFeed] = useState("");
  const [news, setNews] = useState([]);

  function handleInput(event) {
    setFeed(event.target.value);
  }

  function addNews() {
    if (news !== "") {
      const newNews = {
        id: Date.now(),
        value: feed,
      };

      const updateNews = [...news, newNews];
      setNews(updateNews);
      setFeed("");
    }
  }

  return (
    <div>
      <div>
        <input
          className={styles.newsInput}
          type="text"
          value={feed}
          placeholder="What's new?"
          onChange={handleInput}
        />
      </div>
      <button className={styles.newsBtn} onClick={addNews}>
        Add news
      </button>
      <div>
        <ul className={styles.newsFeed}>
          {news.map((item) => (
            <li key={item.id}>
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsFeed;
