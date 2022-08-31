import { watch } from 'vue';

export const useWatchCharacters = (valueToWatch, maxChars = 100) => {
/*
  watch characters
*/
  watch(valueToWatch, (newValue, oldValue) => {
    // nos viene el valor nuevo
    if (newValue.length == maxChars) alert(`only ${maxChars} characters allowed!`);
  });
};
