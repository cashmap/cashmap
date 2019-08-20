import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';

// WITH ALL COMPONENTS - ANYTHING I WANT TO DO PERTAINING TO FIREBASE, I CAN USE AN INSTANCE OF THIS
export class FirebaseWrapper {
  constructor() {
    this.initialized = false; // calling to this firebase wrapper, if its not, we're going to initialize it
    this._firebaseInstance = null; // instance of our npm package
    this._firebaseWrapperInstance = null; // instance of our wrapper
    this._firestore = null;
  }

  Initialize(config) {
    if (!this.initialized) {
      // initialize firebase
      this._firebaseInstance = firebase.initializeApp(config);
      this._firestore = firebase.firestore();
      //setting up functions?
      this.initialized = true;
      console.log('CURRENTLY WORKING');
    } else {
      console.log('already initialized!');
    }
  }

  static GetInstance() {
    // static - directly call without having to instantiate our method first
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper();
    } else {
      // Already initialized, nothing more to do here
    }

    return this._firebaseWrapperInstance;
  }

  //API trigger function

  async GetUserData(exchangeAPI, request) {
    try {
      await firebase.functions().httpsCallable('exchange')({
        public_token: data.metadata.public_token,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  //this is a test for our database to see a post
  async CreateNewDocument(collectionPath, doc) {
    try {
      const ref = this._firestore.collection(collectionPath).doc();
      const timestamp = firebase.firestore.Timestamp.now().toDate();
      return await ref.set({ ...doc, createdAt: timestamp, id: ref.id });
    } catch (error) {
      console.log('something went wrong', error);
    }
  }
  //CREATE A LISTENER THAT FIREBASE CAN LISTEN ON DIFFERENT REFERENCES ON OUR DATABASE, ANYTHING THAT CHANGES ON OUR REFERENCE WE CAN DO A CALLBACK (STORE.SUBSCRIBE.. LETS SET OUR NEW STATE, SIMILAR TO FIREBASE)

  async SetupCollectionListener(collectionPath, callback) {
    try {
      console.log('calling SetupCollectionListener');
      await this._firestore
        .collection(collectionPath)
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          let container = [];
          querySnapshot.forEach(doc => {
            container.push(doc.data());
          });
          return callback(container);
        });
    } catch (error) {
      console.log('oh no! something went wrong!', error);
    }
  }
  //anytime we get data from db, it comes in form of snapshot
}
