import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'

// PASTE YOUR FIREBASE APP CONFIG HERE

const app = firebase.initializeApp(config)

export const auth = app.auth()
export const database = app.database()
export const storage = app.storage()