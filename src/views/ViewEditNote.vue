<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      placeholder="Edit note..."
      label="Edit Note"
    >
      <template #buttons>
        <button
          @click="$router.back()"
          class="button is-link is-light mr-2"
        >
          Cancel
        </button>

        <button
          class="button is-link has-background-link"
          @click="handleSaveClicked"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
/*
  imports
*/

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AddEditNote from '@/components/Notes/AddEditNote.vue';

import { useStoreNotes } from '@/stores/storeNotes';

/*
  router
*/

const route = useRoute();
const router = useRouter();

/*
  store
*/

const storeNotes = useStoreNotes();

/*
  note
*/
const noteId = route.params.id;

const noteContent = ref();
noteContent.value = storeNotes.getNoteContent(noteId);

/*
 save clickced
*/

const handleSaveClicked = () => {
  storeNotes.updateNote(noteId, noteContent.value)
  router.push('/')
};
</script>
