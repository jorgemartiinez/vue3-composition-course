<template>
  <div class="stats">
    <h1>Stats</h1>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of characters (of all notes)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>

    <input
      class="input"
      type="text"
      v-model="loveNoteballs"
      placeholder="Do you love noteballs?"
      maxlength="50"
      v-autofocus
    />
  </div>
</template>

<script setup>
/*
  imports
*/
import { ref } from 'vue';

import { useStoreNotes } from '@/stores/storeNotes';

import { useWatchCharacters } from '@/use/useWatchCharacters';

import { vAutofocus } from '@/directives/vAutofocus.js';

/*
  store
*/

const storeNotes = useStoreNotes();

/*
  love noteballs
*/

const loveNoteballs = ref('');

useWatchCharacters(loveNoteballs, 50);
</script>
