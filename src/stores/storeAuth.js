// stores/counter.js
import { defineStore, acceptHMRUpdate } from 'pinia';

import { auth } from '@/js/firebase';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    };
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("🚀 ~ file: storeAuth.js ~ line 17 ~ onAuthStateChanged ~ user", user)
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push('/')
        } else {
          this.user = {};
          this.router.push('/auth')
        }
      });
    },
    registerUser(credentials) {
      console.log('register user action', credentials);
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log('🚀 ~ file: storeAuth.js ~ line 21 ~ registerUser ~ error', error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('user', user);
          // ...
        })
        .catch((error) => {
          console.log('🚀 ~ file: storeAuth.js ~ line 35 ~ loginUser ~ error', error);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log('user signed out!');
        })
        .catch((error) => {
          console.log('🚀 ~ file: storeAuth.js ~ line 31 ~ signOut ~ error', error.message);
          // An error happened.
        });
    }
  }
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot));
}
