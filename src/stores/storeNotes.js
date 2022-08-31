// stores/counter.js
import { defineStore, acceptHMRUpdate } from 'pinia';

import { db } from '@/js/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';

const notesCollectionRef = collection(db, 'notes');

const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      });
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content
      });
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async getNotes() {
      this.notesLoaded = false;
      const unsubscribe = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        console.log("🚀 ~ file: storeNotes.js ~ line 47 ~ unsubscribe ~ querySnapshot", querySnapshot)
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          notes.push(note);
        });
        this.notes = notes;
        setTimeout(() => {
          this.notesLoaded = true;
        }, 600);
      });

      // later on
      // unsubscribe();
    }
  },
  // UN GETTER ES UN OBJETO, HAY QUE DEVOLVER UNA FUNCIÓN
  getters: {
    getNoteContent: (state) => {
      return (id) => state.notes.find((note) => note.id === id).content;
    },
    totalNotesCount: (state) => state.notes.length,
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => (count += note.content.length));
      return count;
    }
  }
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot));
}
