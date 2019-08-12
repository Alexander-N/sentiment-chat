import app from "firebase/app";

const config = {
  apiKey: "AIzaSyA3yIioFEyQ2I5KHfkOZd3FOp9vUhg4mNM",
  authDomain: "sentiment-chat.firebaseapp.com",
  databaseURL: "https://sentiment-chat.firebaseio.com",
  projectId: "sentiment-chat",
  storageBucket: "sentiment-chat.appspot.com",
  messagingSenderId: "425854601759",
  appId: "1:425854601759:web:dc5ed8c77326d4b6"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
