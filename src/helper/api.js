import firebase from "firebase";
import { DBconfig } from '../hiddenconfig';

// Load values from hidden configuration
var config = {
  apiKey: DBconfig.apiKey,
  authDomain: DBconfig.authDomain,
  databaseURL: DBconfig.databaseURL,
  storageBucket: DBconfig.storageBucket
};

firebase.initializeApp(config);
var db = firebase.database();

export default {
  // authenticate via email/password
  authenticate(email, password, successcallback, errorcallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(successcallback).catch(errorcallback);
  },
  logout(successcallback, errorcallback) {
    firebase.auth().signOut().then(successcallback).catch(errorcallback);
  },
  getCurrentUser(callback) {
    firebase.auth().onAuthStateChanged(callback);
  },
  register(email, password, successcallback, errorcallback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(successcallback).catch(errorcallback);
  },
  updateUserDisplayname(name) {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  },
  addUser(name, email, uid) {
    var usersRef = db.ref('users');
    var usersPush = usersRef.push();

    const key = usersPush.getKey();

    usersPush.set({
      name: name,
      email: email,
      uid: uid,
      created_at: (new Date()).toLocaleString()
    });

    return key;
  },
  getUserByUID(UID, callback) {
    var userRef = db.ref('users').orderByChild("uid").equalTo(UID);

    userRef.on('value', function (snapshot) {
      if (snapshot.val() != null) {
        callback(Object.keys(snapshot.val())[0], snapshot.val());
      } else {
        callback(null, null);
      }
    });
  },

  // addition of a Forum
  addForum(title, content, user_id) {
    var forumRef = db.ref('forums');
    var forumPush = forumRef.push();

    forumPush.set({
      title: title,
      content: content,
      user_id: user_id,
      created_at: (new Date()).toLocaleString()
    });
  },

  //update of a forum
  updateForum(title, content, key) {
    db.ref("forums/" + key).update({ title: title, content: content });
  },

  // deletion of a forum
  deleteForum(key) {
    db.ref("forums/" + key).remove();
  },

  //user specific forum (My forums)
  userForums(user_id, callback) {
    var forumRef = db.ref('forums').orderByChild("user_id").equalTo(user_id);

    forumRef.on('value', function (snapshot) {
      callback(snapshot.val());
    });
  },
  getForumByKey(key, callback) {
    var itemRef = db.ref('forums').child(key);
    var topicsRef = db.ref('topics').orderByChild("forum_id").equalTo(key);

    itemRef.once('value', function (snapshot) {
      callback(snapshot.val(), 'forum')
    });

    topicsRef.on('value', function (snapshot) {
      callback(snapshot.val(), 'topics')
    });
  },
  getMyTopics(forum_key, user_key, callback) {
    var topicsRef = db.ref('topics').orderByChild("userId_forumId").equalTo(user_key + "_" + forum_key);

    topicsRef.on('value', function (snapshot) {
      callback(snapshot.val());
    });
  },
  addTopic(title, content, forum_id, user_id) {
    var topicsRef = db.ref('topics');
    var topicPush = topicsRef.push();

    topicPush.set({
      title: title,
      content: content,
      user_id: user_id,
      created_at: (new Date()).toLocaleString(),
      forum_id: forum_id,
      view_count: 0,
      userId_forumId: user_id + "_" + forum_id
    });
  },
  updateTopic(title, content, key) {

    db.ref("topics/" + key).update({ title: title, content: content });
  },
  deleteTopic(key) {
    db.ref("topics/" + key).remove();
  },
  updateTopicViewCount(key) {
    var topicRef = db.ref('topics').child(key).child('view_count');

    topicRef.transaction(function (views) {
      // if (views) {
      views = views + 1;
      // }
      return views;
    });
  },
  getTopicByKey(key, callback) {

    var topicRef = db.ref('topics').child(key);
    topicRef.on('value', function (snapshot) {
      var topicVal = snapshot.val()
      var userRef = db.ref('users').child(topicVal.user_id)
      userRef.on('value', function (snapshotUser) {
        var forumRef = db.ref('forums').child(topicVal.forum_id)
        forumRef.on('value', function (snapshotForum) {
          callback(topicVal, snapshotUser.val(), snapshotForum.val())
        });
      });
    });
  },
  getHomeLatestForums(callback) {
    var ref = db.ref("forums");

    ref.once("value", function (snapshot) {

      if (snapshot.val() != null) {
        snapshot.forEach(function (forum) {
          var forumKey = forum.key;
          var forumData = forum.val();
          forumData.key = forumKey;
          forumData.topics = [];

          var topicsRef = db.ref("topics").orderByChild("forum_id").equalTo(forumKey);


          topicsRef.on("child_added", function (topics) {
            //console.log(snapshot.key);

            var topicsData = topics.val();
            topicsData.key = topics.key;
            topicsData.username = "";

            var usersRef = db.ref("users/" + topicsData.user_id);

            usersRef.on("value", function (user) {
              topicsData.username = user.val().name;

              forumData.topics.push(topicsData);
            });
          });
          callback(forumData);
        });
      } else {
        callback(null);
      }

    }, function (error) {
      console.log("Error: " + error.code);
    });
  },
  getRepliesByTopicKey(key, callback) {
    var repliesRef = db.ref('replies').orderByChild("topic_id").equalTo(key)

    repliesRef.on('value', function (snapshot) {

      if (snapshot.val() != null) {

        snapshot.forEach(function (reply) {

          var repliesData = reply.val();
          repliesData.username = "";

          db.ref("users/" + repliesData.user_id).once("value", function (user) {
            repliesData.username = user.val().name;

            callback(repliesData);
          });
        });
      } else {
        callback(null);
      }
    });
  },
  updateRepliesByTopicKey(key, callback) {
    var repliesRef = db.ref('replies').orderByChild("topic_id").equalTo(key)

    repliesRef.on('child_added', function (snapshot) {

      if (snapshot.val() != null) {

        var repliesData = snapshot.val();
        repliesData.username = "";

        db.ref("users/" + repliesData.user_id).once("value", function (user) {
          repliesData.username = user.val().name;

          callback(repliesData);
        });
      } else {
        callback(null);
      }
    });
  },
  addReply(content, topic_id, user_id) {
    var replyRef = db.ref('replies');
    var replyPush = replyRef.push();

    replyPush.set({
      content: content,
      user_id: user_id,
      created_at: (new Date()).toLocaleString(),
      topic_id: topic_id
    });
  }
}