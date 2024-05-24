import React, { useState, useEffect, useRef } from "react";
import NewsFeed from "./NewsFeed";
import * as styles from "./NewsPage.module.css";

const NewsPage = () => {
  const [feed, setFeed] = useState("");
  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("newNews")) || []
  );

  const fileInputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const id = location.hash.substring(1);
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 500);
  });

  useEffect(() => {
    localStorage.setItem("newNews", JSON.stringify(news));
  }, [news]);

  function handleInput(event) {
    setFeed(event.target.value);
  }

  function addNews() {
    if (feed !== "") {
      const newNews = {
        id: Date.now(),
        value: feed,
        likes: 0,
        image: fileInputRef.current.files,
      };

      const updateNews = [newNews, ...news];
      setNews(updateNews);
      setFeed("");
    }
  }

  return (
    <div className={styles.container}>
      <h1>News Feed</h1>
      <div className={styles.news}>
        <input
          className={styles.newsInput}
          type="text"
          value={feed}
          placeholder="What's new?"
          onChange={handleInput}
        />
      </div>
      <div>
        <input ref={fileInputRef} type="file" />
      </div>
      <button className={styles.newsBtn} onClick={addNews}>
        Add news
      </button>

      <NewsFeed news={news} setNews={setNews} />
    </div>
  );
};

export default NewsPage;
