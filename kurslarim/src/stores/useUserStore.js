import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { AUTH, DB } from '@/utils/firebase'
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import router from '@/router';

const DEFAULT_USER = {
  uid: null,
  email: null,
  firstname: null,
  lastname: null,
  isAdmin: null
}

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    user: DEFAULT_USER,
    auth: false
  }),
  getters: {

  },
  actions: {
    setUser(user) {
      this.user = { ...this.user, ...user }
      this.auth = true
    },
    async register(formData) {
      try {
        this.loading = true
        const response = await createUserWithEmailAndPassword(AUTH, formData.email, formData.password)
        console.log(response)

        const newUser = {
          uid: response.user.uid,
          email: response.user.email,
          isAdmin: false
        }

        await setDoc(doc(DB, 'users', response.user.uid), newUser)

        this.setUser(newUser)
        router.push('/user/dasboard')
      } catch (error) {

      } finally {
        this.loading = false
      }
    }
  }
})
