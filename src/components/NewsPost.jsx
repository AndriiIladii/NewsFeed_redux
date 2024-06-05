import React, { useState } from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news, handleLikes, handleShare, setNews, renderLinks }) => {
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function handleComment(id) {
    // handleAddComment более информативно
    setCommentId(id);
  }

  function handleCommentEdit(event) {
    setComment(event.target.value);
  }

  function addComment() {
    if (comment !== "") {
      // "" === false
      const newComment = {
        id: Date.now(),
        value: comment,
      };

      const updateComment = news.map((newsPost) => {
        // можно назвать newNews, как ты делал в похожей функции (для консистентности(чтоб везде было одинаково))
        if (newsPost.id === commentId) {
          return {
            ...newsPost,
            comments: [newComment, ...newsPost.comments],
          };
        }
        return newsPost;
      });
      setNews(updateComment);
      setComment("");
      setCommentId(null);
    }
  }

  function deleteComment(PostId, id) {
    // обычные переменные лучше прописывать camelCase-ом
    const updateNews = news.map((newsPost) => {
      if (newsPost.id === PostId) {
        const updateDelete = newsPost.comments.filter(
          // можно в названии переменной упоминать комменты
          (comment) => comment.id !== id
        );
        return {
          ...newsPost,
          comments: updateDelete,
        };
      }

      return newsPost;
    });

    setNews(updateNews);
  }

  function editComment(commentId, value) {
    setCommentId(commentId);
    setComment(value);
  }

  function updateComment(PostId) {
    const updatedNews = news.map((newsPost) => {
      if (newsPost.id === PostId) {
        const updatedComments = newsPost.comments.map((commentItem) => {
          if (commentItem.id === commentId) {
            return {
              ...commentItem,
              value: comment,
            };
          }
          return commentItem;
        });

        return {
          ...newsPost,
          comments: updatedComments,
        };
      }
      return newsPost;
    });
    setNews(updatedNews);
    setComment("");
    setCommentId(null);
  }

  function cancelUpdate() {
    setComment("");
    setCommentId(null);
  }

  return (
    <div>
      <ul className={styles.newsFeed}>
        {news.map((newsPost) => (
          <li className={styles.feedItem} id={newsPost.id} key={newsPost.id}>
            <p>{renderLinks(newsPost.value, newsPost.links)} </p>
            {newsPost.image && <img src={newsPost.image} alt="news" />}
            <div className={styles.postBtns}>
              <button
                className={styles.likeBtn}
                onClick={() => handleLikes(newsPost.id)}
              >
                <span>{newsPost.likes}</span>
                Like
              </button>
              <button onClick={() => handleComment(newsPost.id)}>
                Comment
              </button>
              <button onClick={() => handleShare(newsPost.id)}>Share</button>
            </div>
            <ul className={styles.comments}>
              {newsPost.comments.map((commentItem) => (
                <li key={commentItem.id}>
                  {commentId === commentItem.id ? (
                    <>
                      <input
                        type="text"
                        value={comment}
                        onChange={handleCommentEdit}
                      />
                      <button
                        onClick={() => {
                          updateComment(newsPost.id);
                        }}
                      >
                        Save
                      </button>
                      <button onClick={cancelUpdate}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p>{commentItem.value}</p>
                      <button
                        onClick={() =>
                          editComment(commentItem.id, commentItem.value)
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          deleteComment(newsPost.id, commentItem.id)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            {commentId === newsPost.id && (
              <div>
                <input
                  className={styles.comments}
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Write a comment..."
                />
                <button onClick={addComment}>Add comment</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPost;
