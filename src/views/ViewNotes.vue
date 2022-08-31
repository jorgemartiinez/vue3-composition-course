<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      placeholder="Add a new note..."
      ref="addEditNoteRef"
      label="Add Note"
    >
      <template #buttons>
        <button
          class="button is-link has-background-success"
          @click="addNote"
          :disabled="!newNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success"
      max="100"
    ></progress>

    <template v-else>
      <Note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />

      <div v-if="!storeNotes.totalNotesCount" class="is-size-4 has-text-centered is-family-monospace py-6">
        No notes here yet...
      </div>
    </template>
  </div>
</template>

<script setup>
/*
  imports
*/
import { onMounted, ref } from 'vue';
import Note from '../components/Notes/Note.vue';
import AddEditNote from '../components/Notes/AddEditNote.vue';

import { useStoreNotes } from '@/stores/storeNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters';

/*
  store
*/

const storeNotes = useStoreNotes();

/*
  mounted
*/

onMounted(() => {
  storeNotes.getNotes();
})

/*
  notes
*/

const newNote = ref('');
const addEditNoteRef = ref(null);

const addNote = () => {
  storeNotes.addNote(newNote.value);

  newNote.value = '';
  addEditNoteRef.value.focusTextarea();
};

/*
  useWatchCharacters
*/

useWatchCharacters(newNote);
</script>
