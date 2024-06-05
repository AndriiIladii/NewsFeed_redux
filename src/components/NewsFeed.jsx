//node modules
import React from "react";
// component
import NewsPost from "./NewsPost";

const NewsFeed = ({ news, setNews }) => {
  return <NewsPost news={news} setNews={setNews} />;
};

export default NewsFeed;
