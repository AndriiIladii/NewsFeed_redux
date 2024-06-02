import React, { useState, useEffect, useRef } from "react";
import NewsFeed from "./NewsFeed";
import * as styles from "./NewsPage.module.css";

const NewsPage = () => {
  const [feed, setFeed] = useState("");
  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("newNews")) || []
  );

  const fileInputRef = useRef(null);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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

  function extractLinks(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    const links = [];
    const result = text.replace(urlRegex, function (url) {
      links.push(url);
      return `{${links.length - 1}}`;
    });

    console.log(links);

    return result;
  }

  function testExtractLinks() {
    let text = "тест тест https://www.example.com/en тест тест";
    let test = extractLinks(text);
    console.log(test);
  }

  function handleInput(event) {
    setFeed(event.target.value);
  }

  async function addNews() {
    if (feed !== "") {
      let image = fileInputRef.current.files[0];

      if (image) {
        image = await getBase64(image);
      }

      const newNews = {
        id: Date.now(),
        value: feed,
        likes: 0,
        image: image,
        comments: [],
      };

      const updateNews = [newNews, ...news];
      setNews(updateNews);
      setFeed("");
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
      <button onClick={testExtractLinks}>Test Extract Links</button>
      <NewsFeed news={news} setNews={setNews} />
    </div>
  );
};

export default NewsPage;
