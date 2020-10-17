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
                id: "",         // this id is the database key for this record
                name: "",
                email: "",
                uid: "",        // this is is the user authenticated object
                status: 0       // 0=logout 1=login
            },
            forum: {            // this object will be used when adding and editing forum
                title: "",
                content: ""     
            },
            userForums: [],      // user forums when signed in
            userTopics: [],     // user topics when signed in
            topic: {
                title: "",
                content: ""
            },
            homeForums: [],
            forumDetails: {},
            forumTopics: {},
            topicDetails: {},
            userDetails: {},
            replies: [],
            reply: ""
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
            },
            setUserTopics(state, data) {
                state.userTopics = data
            },
            setTopicTitle(state, data) {
                state.topic.title = data
            },
            setTopicContent(state, data) {
                state.topic.content = data
            },
            addToHomeForums(state, data) {
                if (data != null && data != "") {
                    state.homeForums.push(data);
                }
            },
            setHomeForums(state, data) {
                state.homeForums = data;
            },
            setForumDetails(state, data) {
                state.forumDetails = data
            },
            setForumTopics(state, data) {
                state.forumTopics = data
            },
            setTopicsDetails(state, data) {
                state.topicDetails = data
            },
            setUserDetails(state, data) {
                state.userDetails = data
            },
            setReplies(state, data) {
                state.replies = data;
            },
            setReply(state, data) {
                state.reply = data
            },
            addToReplies(state, data) {
                if (data != null && data != "") {
                    state.replies.push(data);
                }
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
            getUserForums({ commit }, user) {
                api.userForums(user.id, function (response) {
                    if (response) {
                        commit('setUserForums', response);
                    } else {
                        commit('setUserForums', []);
                    }
                });
            },
            //setHomeForumsOnLoad({ commit, dispatch }, callback) {
            setHomeForumsOnLoad({ commit }, callback) {

                commit('setHomeForums', [])

                api.getHomeLatestForums(function (response) {
                    commit('addToHomeForums', response)

                    callback(response);
                });
            },
            //loadForumDetails({ commit, dispatch }, payload) {
            loadForumDetails({ commit }, payload) {

                api.getForumByKey(payload.route.params.id, function (response, item) {

                    if (item == 'forum') {
                        commit('setForumDetails', response)
                    } else {
                        commit('setForumTopics', response)
                    }

                    setTimeout(
                        () => document.getElementById("loading").style.display = "none",
                        500
                    )
                });
            },
            //loadTopicDetails({ commit, dispatch }, payload) {
            loadTopicDetails({ commit }, payload) {

                api.getTopicByKey(payload.route.params.id, function (topic, user, forum) {

                    commit('setTopicsDetails', topic)

                    commit('setUserDetails', user)

                    commit('setForumDetails', forum)

                    setTimeout(
                        () => document.getElementById("loading").style.display = "none",
                        1000
                    )
                });

                commit('setReplies', [])

                api.updateRepliesByTopicKey(payload.route.params.id, function (response) {

                    commit('addToReplies', response)
                });
            }
        }
    })