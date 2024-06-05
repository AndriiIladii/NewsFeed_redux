//node modules
import React, { useState, useEffect, useRef } from "react";
// components
import NewsFeed from "./NewsFeed";
//utils
import { getBase64, extractLinks } from "./utils";
//styles
import * as styles from "./NewsPage.module.css";

const NewsPage = () => {
  const [createNewPostValue, setCreateNewPostValue] = useState("");
  const [news, setNews] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem("newNews")) || [];
    setNews(storedNews);
  }, []);

  useEffect(() => {
    localStorage.setItem("newNews", JSON.stringify(news));
  }, [news]);

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
  }, []);

  function handleInput(event) {
    setCreateNewPostValue(event.target.value);
  }

  async function addNews() {
    if (createNewPostValue) {
      let image = fileInputRef.current.files[0];

      if (image) {
        image = await getBase64(image);
      }

      const [text, links] = extractLinks(createNewPostValue);

      const newNews = {
        id: Date.now(),
        value: text,
        likes: 0,
        image,
        comments: [],
        links,
      };

      const updateNews = [newNews, ...news];
      setNews(updateNews);
      setCreateNewPostValue("");
      fileInputRef.current.value = null;
    }
  }

  return (
    <div className={styles.container}>
      <h1>News Feed</h1>
      <div className={styles.news}>
        <input
          className={styles.newsInput}
          type="text"
          value={createNewPostValue}
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
