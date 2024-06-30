//node modules
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addLike,
  addNewComment,
  deleteComment,
  handleCopyUrl,
} from "../store/action";
//styles
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news, setNews }) => {
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);

  const dispatch = useDispatch();

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
    dispatch(handleCopyUrl(id));
  }

  function handleLikes(id) {
    dispatch(addLike(id));
  }

  function addComment() {
    if (comment) {
      const newComment = {
        id: Date.now(),
        value: comment,
      };

      dispatch(addNewComment(commentId, newComment));
      setComment("");
      setCommentId(null);
    }
  }

  function handleDeleteComment(postId, commentId) {
    dispatch(deleteComment(postId, commentId));
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
                          handleDeleteComment(newsPost.id, commentItem.id)
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
