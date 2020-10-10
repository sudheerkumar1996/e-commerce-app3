import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config= {
 
  apiKey: "AIzaSyD8g3hZYCNwrr557_3PQ4aJnrEqBXAu8JQ",
  authDomain: "shop-dd6e0.firebaseapp.com",
  databaseURL: "https://shop-dd6e0.firebaseio.com",
  projectId: "shop-dd6e0",
  storageBucket: "shop-dd6e0.appspot.com",
  messagingSenderId: "599540522828",
  appId: "1:599540522828:web:2a97e9863d089141e9f9e9",
  measurementId: "G-WB6HWRFZJY"
  };
  export const createUserProfileDocument = async(userAuth , additionalData) => {
    if(!userAuth) return ;
    const userRef=firestore.doc(`users/${userAuth.uid}`);//we will get back user reference at that location
    const snapShot =await userRef.get();// get snapshot of firestore
    if(!snapShot.exists)//if snapshop does not exists then we need to create it.
    {
      const{displayName , email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }
      catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  };
//async use for async request
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    //console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {const newDocRef = collectionRef.doc();
      console.log(newDocRef);
      batch.set(newDocRef,obj)
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap =(collections)=>{
    const transformedCollection = collections.docs.map(doc =>{
      const { title,items}= doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
    });
    //console.log(transformedCollection);
    return transformedCollection.reduce((accumulator,collection)=>{
      accumulator[collection.title.toLowerCase()]=collection;
      return accumulator;
    },{});
  } ;

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore= firebase.firestore();
const  provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase ;

// console.log(firestore.doc('users/128fdashadu'))
//const collectionRef=firestore.collection('users');
 //const collectionSnapshot= await collectionRef.get();
    //console.log({collection: collectionSnapshot.docs.map(doc=>doc.data())});
    //console.log(snapShot);