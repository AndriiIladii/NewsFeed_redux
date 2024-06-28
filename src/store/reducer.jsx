const initialState = {
  news: [],
};

const newsFeedReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default newsFeedReducer;
