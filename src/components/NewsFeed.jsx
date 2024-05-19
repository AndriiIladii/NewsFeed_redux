import React, { useState, useEffect } from "react";
import NewsPost from "./NewsPost";
import * as styles from "./NewsFeed.module.css";

const NewsFeed = () => {
  const [feed, setFeed] = useState("");
  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("newNews")) || []
  );

  useEffect(() => {
    localStorage.setItem("newNews", JSON.stringify(news));
  }, [news]);

  function handleInput(event) {
    setFeed(event.target.value);
  }

  function addNews() {
    if (news !== "") {
      const newNews = {
        id: Date.now(),
        value: feed,
      };

      const updateNews = [newNews, ...news];
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
      <NewsPost news={news} />
    </div>
  );
};

export default NewsFeed;
