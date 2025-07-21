import { defineStore } from 'pinia'
import router from '@/router'
import { DB } from '@/utils/firebase'
import { getDoc, doc, setDoc, updateDoc, serverTimestamp, query, orderBy, getDocs, limit, startAfter, collection } from 'firebase/firestore'
import { useUserStore } from './useUserStore'

let coursesCol = collection(DB,'courses')

export const UseCourseStore = defineStore('course',{
    state:()=>({
        homeCourses:'',
        adminCourses:'',
        adminLastVisible:''
    }),
    getters:{

    },
    actions:{
        async addCourse(formData){
            const userStore = useUserStore()
            const user = userStore.getUserData

            const newCourse = doc(coursesCol)
            await setDoc(newCourse,{
                timestamp:serverTimestamp(),
                owner:{
                    uid:user.uid,
                    firstname:user.firstname,
                    lastname:user.lastname
                },
                ...formData
            })
            router.push({name:'courses'})
        }
    }
})