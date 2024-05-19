import React from "react";
import NewsFeed from "./components/NewsFeed";
import * as styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <h1>News Feed</h1>
      <div className={styles.news}>
        <NewsFeed />
      </div>
    </div>
  );
};

export default App;
