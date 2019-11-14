import * as firebase from 'firebase'
import 'firebase/firestore'

export class FirebaseWrapper {
  constructor() {
    this.initialized = false
    this._firebaseInstance = null
    this._firebaseWrapperInstance = null
    this._firestore = null
  }

  Initialize(config) {
    if (!this.initialized) {
      this._firebaseInstance = firebase.initializeApp(config)
      this._firestore = firebase.firestore()
      this.initialized = true
      console.log('Firebase initialized!')
    } else {
      console.log('Already initialized!')
    }
  }

  static GetInstance() {
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper()
    } else {
      console.log('Already initialized!')
    }
    return this._firebaseWrapperInstance
  }

  // passing in something like post and the data you want to create 
  async CreateNewDocument(collectionPath, doc) {
    try {
      const ref = this._firestore.collection(collectionPath).doc()
      const timestamp = firebase.firestore.Timestamp.now().toDate()
      return await ref.set({ ...doc, createdAt: timestamp, id: ref.id })
    } catch (error) {
      console.log(error)
    }
  }

  async SetupCollectionListener(collectionPath, callback) {
    try {
      console.log('Calling SetupCollectionListener')
      await this._firestore.collection(collectionPath).orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
        let container = []
        querySnapshot.forEach(doc => {
          container.push(doc.data())
        })
        return callback(container)
      })
    } catch (error) {
      console.log(error)
    }
  }
}