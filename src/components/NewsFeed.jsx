import React from "react";
import NewsPost from "./NewsPost";

const NewsFeed = ({ news, setNews, renderLinks }) => {
  function handleLikes(id) { // можно перенести сразу в компонент в котором используется, избегаем props drilling
    let updateLikes = news.map((item) => // переменная updateLikes не меняется дальше по коду
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setNews(updateLikes);
  }

  function handleShare(id) { // можно перенести сразу в компонент в котором используется, избегаем props drilling
    const url = `http://localhost:3000/#${id}`;
    const el = document.createElement("textarea");
    el.value = url;

    document.body.appendChild(el);
    el.select();

    document.execCommand("copy");

    alert("The data copied successfully! press `ctrl+v` to see output");
    document.body.removeChild(el);
  }

  return (
    <NewsPost
      news={news}
      handleLikes={handleLikes}
      handleShare={handleShare}
      setNews={setNews}
      renderLinks={renderLinks}
    />
  );
};

export default NewsFeed;
