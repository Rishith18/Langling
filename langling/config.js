import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDg1WfcRB_apphTdivfm2IV7qdZYOeZ33k",
  authDomain: "langling-v2.firebaseapp.com",
  databaseURL: "https://langling-v2-default-rtdb.firebaseio.com",
  projectId: "langling-v2",
  storageBucket: "langling-v2.appspot.com",
  messagingSenderId: "889424734355",
  appId: "1:889424734355:web:827ae6f034570fa9024566"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database();

//label as remoteDb
