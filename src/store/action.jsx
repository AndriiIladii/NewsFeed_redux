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

export const addLike = (id) => ({
  type: "ADD_LIKE",
  payload: id,
});

export const handleCopyUrl = (id) => ({
  type: "COPY_URL",
  payload: id,
});

export const addNewComment = (postId, newComment) => ({
  type: "ADD_NEW_COMMENT",
  payload: { postId, newComment },
});

export const deleteComment = (postId, commentId) => ({
  type: "DELETE_COMMENT",
  payload: { postId, commentId },
});
