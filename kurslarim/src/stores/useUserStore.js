import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { AUTH, DB } from '@/utils/firebase'
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import router from '@/router';
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

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
    async signOut(){
      await signOut(AUTH)
      this.user = DEFAULT_USER
      this.auth = false
      router.push('/')
    },
    async autoSignin(uid){
      const userData = await this.getUserProfile(uid)
      this.setUser(userData)
      return true
    },
    async getUserProfile(uid){
      try {
        const userRef = await getDoc(doc(DB,'users',uid))
        return userRef.data()
      } catch (error) {
        
      }
    },
    async signIn(formData){
      try {
        this.loading = true
        const response = await signInWithEmailAndPassword(AUTH, formData.email, formData.password)
        
        const useData = await this.getUserProfile(response.user.uid)
        this.setUser(useData)
        
        router.push('/user/dasboard')
        $toast.success('Hoşgeldiniz!')
      } catch (error) {
        $toast.error('Hatalı Giriş Yaptınız!')
      } finally {
        this.loading = false
      }
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
        $toast.success('Hoşgeldiniz!')
      } catch (error) {
         $toast.error('Hatalı Kaydolma işlemi Yaptınız!')
      } finally {
        this.loading = false
      }
    }
  }
})
