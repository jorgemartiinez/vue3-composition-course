import { createRouter, createWebHashHistory } from 'vue-router';
import { useStoreAuth } from '@/stores/storeAuth';
/*
 views
*/
import ViewNotes from '@/views/ViewNotes.vue';
import ViewStats from '@/views/ViewStats.vue';
import ViewEditNote from '@/views/ViewEditNote.vue';
import ViewAuth from '@/views/ViewAuth.vue';

const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/editNote/:id',
    name: 'editNote',
    component: ViewEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.beforeEach(async (to, from) => {

  const storeAuth = useStoreAuth();

  if(!storeAuth.user.id && to.name !== 'auth') return { name: 'auth' }

  if(storeAuth.user.id && to.name == 'auth') return false;
})

export default router;
