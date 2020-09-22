// add your own config params...

  /*
  var mykey = 'some-default-string';
    var env = process.env.NODE_ENV || 'development';

    if (env === 'development') {
        mykey = config.MY_KEY;
        ...
    }
    if (env === 'production') {
        mykey = process.env.MY_KEY;
        ...
    }
    */



/* secret keys */
// add your own config params, get them from 
// https://console.firebase.google.com/project/<project-name>/settings/general/
// DO NOT COMMIT THE FILE WITH YOUR API KEY

export const DBconfig = {
    apiKey: '<here goes your FIREBASE_API_KEY>', // TO BE CHANGED
    authDomain: 'localhost',
    databaseURL: '<FIREBASE database URL>', // e.g. https://forum-83f21.firebaseio.com
    storageBucket: '<FIREBASE_STORAGE_BUCKET>' // e.g. 'gs://forum-83f21.appspot.com'
}

