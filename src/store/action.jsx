export const addNews = (news) => ({
  type: "ADD_NEWS",
  payload: news,
});

export const saveNews = (news) => ({
  type: "SAVE_NEWS",
  payload: news,
});

export const loadNews = (news) => ({
  type: "LOAD_NEWS",
  payload: news,
});
