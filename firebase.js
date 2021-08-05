import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCjhb7UOsY8NiXvDVmJvcV68GICAJGf4M",
    authDomain: "docsapp-5c479.firebaseapp.com",
    databaseURL: "https://docsapp-5c479.firebaseio.com",
    projectId: "docsapp-5c479",
    storageBucket: "docsapp-5c479.appspot.com",
    messagingSenderId: "642308169872",
    appId: "1:642308169872:web:ba490443a877b3ea3cf815",
    measurementId: "G-ZBPXLWRLDE"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
// export const firestore = firebase.firestore();