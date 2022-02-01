import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

const config = {
    apiKey: "AIzaSyBVCAaSIpRWGSGRCYugei9Ea5eB6m_-ujE",
    authDomain: "chat-web-app-e97c8.firebaseapp.com",
    projectId: "chat-web-app-e97c8",
    storageBucket: "chat-web-app-e97c8.appspot.com",
    messagingSenderId: "1067756103075",
    appId: "1:1067756103075:web:892b941fa3e18c8fcba616"
};

const app = firebase.initializeApp(config)

export const auth = app.auth()
export const database = app.database()