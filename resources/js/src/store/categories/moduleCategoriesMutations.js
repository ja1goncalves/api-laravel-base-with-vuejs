/*=========================================================================================
  File Name: moduleCategoriesMutations.js
  Description: Todo Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_TODO_SEARCH_QUERY (state, query) {
    state.todoSearchQuery = query
  },
  UPDATE_TODO_FILTER (state, filter) {
    state.todoFilter = filter
  },

  // API
  SET_CATEGORIES (state, tasks) {
    state.categories = tasks
  },
  ADD_CATEGORY (state, category) {
    state.categories.unshift(category)
  },
  UPDATE_CATEGORY (state, category) {
    const categoryIndex = state.categories.findIndex((t) => t.id === category.id)
    Object.assign(state.categories[categoryIndex], category)
  }
}
