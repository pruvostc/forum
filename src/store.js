import Vue from 'vue'
import Vuex from 'vuex'
import api from './helper/api'

Vue.use(Vuex);

export default new Vuex.Store(
    {
        state: {
            auth: {
                email: "",
                password: "",
                name: ""
            },
            currentUser: {
                id: "",         // this id is the datebase key for this record
                name: "",
                email: "",
                uid: "",        // this is is the user authenticated object
                status: 0       // 0=logout 1=login
            },
            forum: {            // this object will be used when adding and editing forum
                title: "",
                content: ""
            },
            userForums: []      // user forums in case he is login
        },
        mutations: {
            setAuthEmail(state, data) {
                state.auth.email = data
            },
            setAuthPassword(state, data) {
                state.auth.password = data
            },
            setAuthName(state, data) {
                state.auth.name = data
            },
            setCurrUserId(state, data) {
                state.currentUser.id = data
            },
            setCurrUserName(state, data) {
                state.currentUser.name = data
            },
            setCurrUserEmail(state, data) {
                state.currentUser.email = data
            },
            setCurrUserUid(state, data) {
                state.currentUser.uid = data
            },
            setCurrUserStatus(state, data) {
                state.currentUser.status = data
            },
            setForumTitle(state, data) {
            state.forum.title = data
            },
            setForumContent(state, data) {
            state.forum.content = data
            },
            setUserForums(state, data) {
            state.userForums = data
            }          
        },
        actions: {
            getCurrentUser({ commit }) {
                api.getCurrentUser(function (user) {
                    if (user) {
                        api.getUserByUID(user.uid, function (key, val) {
                            if (key != null && val != null) {
                                commit('setCurrUserId', key);
                                commit('setCurrUserName', user.displayName);
                                commit('setCurrUserEmail', user.email);
                                commit('setCurrUserUid', user.uid);
                                commit('setCurrUserStatus', 1);
                            }
                        })
                    }
                });
            },
            clearUserData({ commit }) {
                commit('setCurrUserId', '');
                commit('setCurrUserName', '');
                commit('setCurrUserEmail', '');
                commit('setCurrUserUid', '');
                commit('setCurrUserStatus', 0);

                commit('setAuthEmail', '');
                commit('setAuthPassword', '');
                commit('setAuthName', '');
            },
            getUserForums({commit}, user) {
                api.userForums(user.id, function(response) {
                if(response) {
                    commit('setUserForums', response); 
                } else {
                    commit('setUserForums', []);
                }
                });
            }      
        }
    })