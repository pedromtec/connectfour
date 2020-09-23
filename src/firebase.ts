import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyA_Qia6xMudppkJRhCzRmus60-Bfqo-xJU',
  authDomain: 'connectfour-13950.firebaseapp.com',
  databaseURL: 'https://connectfour-13950.firebaseio.com',
  projectId: 'connectfour-13950',
  storageBucket: 'connectfour-13950.appspot.com',
  messagingSenderId: '222869263253',
  appId: '1:222869263253:web:2b4214ba80761985209c9c',
  measurementId: 'G-JNH3V8J3XD'
}

firebase.initializeApp(firebaseConfig)

const databaseRef = firebase.database().ref()
export const matchesRef = databaseRef.child('results')

export default firebase
