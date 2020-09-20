import firebase from "firebase";

// add your own config params, get them from 
// https://console.firebase.google.com/project/<project-name>/settings/general/
/*
var config = {
  apiKey: "<your api key>",
  authDomain: "<your auth domain>",
  databaseURL: "<your database url>",
  storageBucket: "<your storage bucket>", // e.g. "gs://forum12345.appspot.com"
};
*/
var config = {
  apiKey: "AIzaSyBDqBt1yca3n4mqqOaw4lpwQRivpMCeBXc",
  authDomain: "localhost",
  databaseURL: "https://forum-34f56.firebaseio.com",
  storageBucket: "gs://forum-34f56.appspot.com"
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
  }

}