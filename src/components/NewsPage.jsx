//node modules
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNews, loadNews, saveNews } from "../store/action";
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

  const localNews = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNews(news));

    const handleBeforeUnload = () => {
      dispatch(saveNews(news));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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

  async function handleAddNews() {
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

      dispatch(addNews(newNews));
      setNews([newNews, ...news]);
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
      <button className={styles.newsBtn} onClick={handleAddNews}>
        Add news
      </button>
      <NewsFeed news={localNews} setNews={setNews} />
    </div>
  );
};

export default NewsPage;
