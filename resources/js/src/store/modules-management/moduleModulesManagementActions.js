/*=========================================================================================
  File Name: moduleModulesManagementActions.js
  Description: Todo Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
    allModules ({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get('/api/modules')
                .then((response) => {
                    commit('SET_MODULES', response.data.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchModule (context, moduleId) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/modules/${moduleId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    delete (context, categoryId) {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/modules/${categoryId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    create ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/modules', payload)
                .then((response) => {
                    commit('ADD_MODULE', response.data.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    update ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/modules/${payload.id}`, payload)
                .then((response) => {
                    // commit('UPDATE_MODULE', response.data.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    }
}
