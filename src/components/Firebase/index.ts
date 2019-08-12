import app from "firebase/app";
import "firebase/auth";

const config = {
  // Key is not confidential: https://stackoverflow.com/a/37484053
  apiKey: "AIzaSyA3yIioFEyQ2I5KHfkOZd3FOp9vUhg4mNM",
  authDomain: "sentiment-chat.firebaseapp.com",
  databaseURL: "https://sentiment-chat.firebaseio.com",
  projectId: "sentiment-chat",
  storageBucket: "sentiment-chat.appspot.com",
  messagingSenderId: "425854601759",
  appId: "1:425854601759:web:dc5ed8c77326d4b6"
};

export class Firebase {
  private auth: firebase.auth.Auth;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  isUserSignedIn() {
    return !!this.auth.currentUser;
  }
}

export const FirebaseSingleton = new Firebase();
