const initialState = {
  news: [],
};

const newsFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    // NewsPage
    case "ADD_NEWS": {
      return {
        news: state.news.concat(action.payload),
      };
    }

    case "SAVE_NEWS": {
      localStorage.setItem("newNews", JSON.stringify(state.news));
    }

    case "LOAD_NEWS": {
      return {
        news: JSON.parse(localStorage.getItem("newNews")) || [],
      };
    }

    // NewsPage
    // NewsPost
    case "ADD_LIKE": {
      return {
        news: state.news.map((item) =>
          item.id === action.payload ? { ...item, likes: item.likes + 1 } : item
        ),
      };
    }

    case "COPY_URL": {
      const url = `http://localhost:3000/#${action.payload}`;
      const el = document.createElement("textarea");
      el.value = url;

      document.body.appendChild(el);
      el.select();

      document.execCommand("copy");

      alert("The data copied successfully! press `ctrl+v` to see output");
      document.body.removeChild(el);
    }

    case "ADD_NEW_COMMENT": {
      return {
        news: state.news.map((newsPost) =>
          newsPost.id === action.payload.postId
            ? {
                ...newsPost,
                comments: [action.payload.newComment, ...newsPost.comments],
              }
            : newsPost
        ),
      };
    }

    case "DELETE_COMMENT": {
      return {
        news: state.news.map((newsPost) =>
          newsPost.id === action.payload.postId
            ? {
                ...newsPost,
                comments: newsPost.comments.filter(
                  (comment) => comment.id !== action.payload.commentId
                ),
              }
            : newsPost
        ),
      };
    }
    // NewsPost
    default:
      return state;
  }
};

export default newsFeedReducer;
