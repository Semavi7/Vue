import { defineStore } from 'pinia'
import router from '@/router'
import { DB } from '@/utils/firebase'
import { getDoc, doc, setDoc, updateDoc, serverTimestamp, query, orderBy, getDocs, limit, startAfter, collection, deleteDoc } from 'firebase/firestore'
import { useUserStore } from './useUserStore'

let coursesCol = collection(DB, 'courses')

export const UseCourseStore = defineStore('course', {
    state: () => ({
        homeCourses: '',
        adminCourses: '',
        adminLastVisible: ''
    }),
    getters: {

    },
    actions: {
        async addCourse(formData) {
            const userStore = useUserStore()
            const user = userStore.getUserData

            const newCourse = doc(coursesCol)
            await setDoc(newCourse, {
                timestamp: serverTimestamp(),
                owner: {
                    uid: user.uid,
                    firstname: user.firstname,
                    lastname: user.lastname
                },
                ...formData
            })
            router.push({ name: 'courses', query: { reload: true } })
        },

        async adminGetCourses(docLimit) {
            const q = query(coursesCol, orderBy('timestamp', 'desc'), limit(docLimit))
            const querySnapshot = await getDocs(q)

            const lastVisibile = querySnapshot.docs[querySnapshot.docs.length - 1]

            const courses = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.adminCourses = courses
            this.adminLastVisible = lastVisibile
        },

        async adminGetMoreCourses(docLimit) {
            let oldCourses = this.adminCourses
            const q = query(coursesCol, orderBy('timestamp', 'desc'), startAfter(this.adminLastVisible), limit(docLimit))
            const querySnapshot = await getDocs(q)
            const lastVisibile = querySnapshot.docs[querySnapshot.docs.length - 1]
            const newCourses = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.adminCourses = [
                ...oldCourses,
                ...newCourses
            ]
            this.adminLastVisible = lastVisibile
        },

        async removeById(courseId) {
            await deleteDoc(doc(DB, 'courses', courseId))
            const newList = this.adminCourses.filter(course => {
                return course.id != courseId
            })
            this.adminCourses = newList
        },

        async getCourseById(id){
            try {
                const docRef = await getDoc(doc(DB,'courses',id))
            return docRef.data()
            } catch (error) {
                
            }
        },

        async updateCourse(id, formData){
            const docRef = doc(DB,'courses',id)
            await updateDoc(docRef, {...formData})
        }
    }
})