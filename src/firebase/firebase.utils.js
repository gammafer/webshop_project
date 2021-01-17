import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config ={
        apiKey: "AIzaSyCNsoHO10Cdp_FJ7mlNwgo1PT2q1pOaO8M",
        authDomain: "crwn-db-9f551.firebaseapp.com",
        databaseURL: "https://crwn-db-9f551.firebaseio.com",
        projectId: "crwn-db-9f551",
        storageBucket: "crwn-db-9f551.appspot.com",
        messagingSenderId: "109950011863",
        appId: "1:109950011863:web:4203687343e764cf2ba392"
};

export const createUserProfileDocument = async(userAuth,additionalData)=>{
        if(!userAuth) return;
       const userRef = firestore.doc(`users/${userAuth.uid}`);
       const snapShot =await userRef.get();
       if(!snapShot.exists){
               const {displayName,email}=userAuth;
               const createdAt=new Date();

               try{
                await userRef.set({
                        displayName,
                        email,
                        createdAt,
                        ...additionalData
                })
               }
               catch(error){
                        console.log('error creating user ', error.message)
               }
       }
       return userRef;

}

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;