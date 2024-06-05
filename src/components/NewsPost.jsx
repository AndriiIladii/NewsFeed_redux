import React, { useState } from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news, setNews }) => {
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function handleAddComment(id) {
    setCommentId(id);
  }

  function handleCommentEdit(event) {
    setComment(event.target.value);
  }

  function renderLinks(str, links) {
    const textParts = str.split("{link}");
    return textParts.map((item, index) => {
      return (
        <span key={index}>
          {item}
          {links[index] && <a href={links[index]}>{links[index]}</a>}
        </span>
      );
    });
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

  function handleLikes(id) {
    const updateLikes = news.map((item) =>
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setNews(updateLikes);
  }

  function addComment() {
    if (comment) {
      const newComment = {
        id: Date.now(),
        value: comment,
      };

      const newNews = news.map((newsPost) => {
        if (newsPost.id === commentId) {
          return {
            ...newsPost,
            comments: [newComment, ...newsPost.comments],
          };
        }
        return newsPost;
      });
      setNews(newNews);
      setComment("");
      setCommentId(null);
    }
  }

  function deleteComment(postId, commentId) {
    const updatedNews = news.map((newsPost) => {
      if (newsPost.id === postId) {
        const updatedComments = newsPost.comments.filter(
          (comment) => comment.id !== commentId
        );
        return {
          ...newsPost,
          comments: updatedComments,
        };
      }

      return newsPost;
    });

    setNews(updatedNews);
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
              <button onClick={() => handleAddComment(newsPost.id)}>
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
