/*=========================================================================================
  File Name: moduleModulesManagementMutations.js
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
    SET_MODULES (state, modules) {
        state.modules = modules
    },
    ADD_MODULE (state, module) {
        state.modules.unshift(module)
    },
    UPDATE_MODULE (state, module) {
        const moduleIndex = state.modules.findIndex((t) => t.id === module.id)
        Object.assign(state.modules[moduleIndex], module)
    }
}
