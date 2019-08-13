import app from "firebase/app";
import firebase from "firebase/app";
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

export class Auth {
  auth: firebase.auth.Auth;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  async createUser(
    email: string,
    password: string,
    userName: string,
    fullName: string
  ) {
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(userName)
      .get();
    if (user.exists) {
      return Promise.reject(new Error("Username already taken."));
    }
    const authUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await firebase
      .firestore()
      .collection("users")
      .doc(userName)
      .set({ userName: userName, fullName: fullName, uid: authUser.user!.uid });
    return authUser;
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }
}

export const AuthService = new Auth();
