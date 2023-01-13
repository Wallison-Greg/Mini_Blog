import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase" //utilizando o path do db do firebase

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2a67ayGgK6XOxJdIvnv0U6lTxKdIrbIg",
  authDomain: "miniblog-44b32.firebaseapp.com",
  projectId: "miniblog-44b32",
  storageBucket: "miniblog-44b32.appspot.com",
  messagingSenderId: "340860997385",
  appId: "1:340860997385:web:b1490844c803d79a71cdd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize banco de dados firebase
const db = getFirestore(app)

export {db};

//obs: para instalar o (firebase) e nescessario utilizar o seguinte codigo no cmd da aplicação "npm i firebase"