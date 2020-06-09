/*=========================================================================================
  File Name: moduleCategoriesActions.js
  Description: Todo Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  allCategories ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/categories')
        .then((response) => {
          commit('SET_CATEGORIES', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  delete (context, categoryId) {
      return new Promise((resolve, reject) => {
          axios.delete(`/api/categories/${categoryId}`)
              .then((response) => {
                  resolve(response)
              })
              .catch((error) => { reject(error) })
      })
  },

  create ({ commit }, name) {
    return new Promise((resolve, reject) => {
      axios.post('/api/categories', {name: name})
        .then((response) => {
            commit('ADD_CATEGORY', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  update ({ commit }, category) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/categories/${category.id}`, {name: category.name})
        .then((response) => {
          commit('UPDATE_CATEGORY', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
