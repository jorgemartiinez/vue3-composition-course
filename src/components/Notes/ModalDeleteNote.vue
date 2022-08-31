<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div
      class="modal-card"
      ref="modalCardRef"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete note</p>
        <button
          @click="closeModal"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">Are you sure you want to delete this note? {{noteId}}</section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
          class="button"
          @click="closeModal"
        >
          Cancel
        </button>
        <button class="button is-danger" @click="storeNotes.deleteNote(noteId)">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';

import { onMounted, onUnmounted, ref } from 'vue';

import { useStoreNotes } from '@/stores/storeNotes';

/*
  props
*/
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
});

/*
  emits
*/
const emit = defineEmits(['update:modelValue']);

/*
  store
*/

const storeNotes = useStoreNotes();

/*
  close modal
*/

const closeModal = () => {
  emit('update:modelValue', false);
};

/*
  click outside
*/

const modalCardRef = ref(null);

onClickOutside(modalCardRef, (ev) => {
  closeModal();
});

/*
  keyboard control
*/

const handleKeyboard = (e) => {
  console.log(e);
  if (e.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard);
});

onUnmounted(() => {
  // Si no cada vez que abramos un modal creará un nuevo listener
  document.removeEventListener('keyup', handleKeyboard);
});

/*
  deleteNote
*/
</script>
