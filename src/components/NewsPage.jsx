import React, { useState, useEffect, useRef } from "react";
import NewsFeed from "./NewsFeed";
import * as styles from "./NewsPage.module.css";

const NewsPage = () => {
  const [feed, setFeed] = useState(""); // Переименовать например в createNewPostValue или другое, более осмысленное
  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("newNews")) || [] // Лучше перенести в useEffect и сетить после первого рендера, потому что на реальном проекте данные будут приходить асинхронно, а не доставаться из локального хранилища
  );

  const fileInputRef = useRef(null);

  function getBase64(file) {
    // Создай файлик utils.js и храни такие функции там. Сделаешь код чище, и если нужно будет в другом компоненте использовать эту функцию у всех будет импорт с одного места
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
  }); // без массива зависимостей этот useEffect срабатывает при любом обновлении компонента. Такое может сильно ударить по производительности сайта в будущем, поэтому привыкай всегда указывать массив зависимостей.

  useEffect(() => {
    localStorage.setItem("newNews", JSON.stringify(news));
  }, [news]);

  function extractLinks(text) {
    // можно перенестив файлик utils.js
    let urlRegex = /(https?:\/\/[^\s]+)/g; // можно сразу использовать в replace, ненужная переменная
    const links = [];
    const result = text.replace(urlRegex, function (url) {
      links.push(url);
      return `{link}`;
    });

    return [result, links];
  }

  function renderLinks(str, links) {
    // можно перенести сразу в компонент где используется эта функция. Избегай props drilling
    const link = str.split("{link}"); // неудачное имя переменной, в ней лежит не ссылка, а массив с текстом без ссылок
    return link.map((item, index) => {
      return (
        <span key={index}>
          {item}
          {links[index] && <a href={links[index]}>{links[index]}</a>}
        </span>
      );
    });
  }

  function handleInput(event) {
    setFeed(event.target.value);
  }

  async function addNews() {
    if (feed !== "") {
      // "" === false, возможно переписать проще условие, без сравнений
      let image = fileInputRef.current.files[0];
      let links = []; // ненужная переменная, можешь убрать

      if (image) {
        image = await getBase64(image);
      }

      const [text, extractedLinks] = extractLinks(feed);
      links = extractedLinks; // ненужная переменная links, можешь убрать

      const newNews = {
        id: Date.now(),
        value: text,
        likes: 0,
        image: image, // есть короткая запись, просто image,
        comments: [],
        links: links, // есть короткая запись, просто links,
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
      <NewsFeed news={news} setNews={setNews} renderLinks={renderLinks} />
    </div>
  );
};

export default NewsPage;
