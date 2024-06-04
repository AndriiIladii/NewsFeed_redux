import React from "react";
import NewsPost from "./NewsPost";

const NewsFeed = ({ news, setNews, renderLinks }) => {
  function handleLikes(id) {
    let updateLikes = news.map((item) =>
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setNews(updateLikes);
  }

  function handleShare(id) {
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
