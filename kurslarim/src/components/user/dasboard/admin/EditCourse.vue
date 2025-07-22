<template>
    <div>
        <div>
            <h1>Kurs Güncelle</h1>
            <hr>
            <Form :validation-schema="CourseSchema" @submit="onSubmit" class="mb-4">
                <div class="mb-4">
                    <Field name="category" v-model="course.category" v-slot="{ field, errors, errorMessage }">
                        <input type="email" class="form-control" placeholder="Lütfen Kategori Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }" />
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <Field name="title" v-model="course.title" v-slot="{ field, errors, errorMessage }">
                        <input type="text" class="form-control" placeholder="Lütfen Kurs Adı Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }" />
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <Field name="summary" v-model="course.summary" v-slot="{ field, errors, errorMessage }">
                        <textarea type="text" class="form-control" placeholder="Lütfen Kurs Özeti Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }"></textarea>
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <Field name="rating" v-model="course.rating" v-slot="{ field, errors, errorMessage }">
                        <select v-bind="field" class="form-select" :class="{ 'is-invalid': errors.length !== 0 }">
                            <option value="Kurs Puanı Seçiniz">Kurs Puanı Seçiniz</option>
                            <option v-for="rating in ratingArray" :value="rating" :key="rating">{{ rating }}</option>
                        </select>
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <Field name="img" v-model="course.img" v-slot="{ field, errors, errorMessage }">
                        <input type="text" class="form-control" placeholder="Lütfen Kurs Resmi Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }" />
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <TipTop :content="course.description" @update="updateEditor"/>
                     <Field v-model="veditor" name="description" v-slot="{ field, errors, errorMessage }">
                        <input type="hidden" class="form-control" placeholder="Lütfen Kurs Resmi Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }" />
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <v-btn :loading="loading" type="submit" variant="outlined">Kurs Güncelle</v-btn>
            </Form>
        </div>
    </div>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import CourseSchema from './schema'
import TipTop from '@/utils/TipTap.vue'
import { ref } from 'vue'
import { UseCourseStore } from '@/stores/courses'
import { useToast } from 'vue-toast-notification'
import { useRoute, useRouter } from 'vue-router'

const $toast = useToast()
const ratingArray = [0,1,2,3,4,5]

const courseStore = UseCourseStore()

const route = useRoute()
const router = useRouter()

const veditor = ref('')
const course = ref({})
const loading = ref(false)

courseStore.getCourseById(route.params.id).then((response)=>{
    course.value = {...response}
})

const onSubmit = (values,{resetForm}) => {
    loading.value = true
    courseStore.updateCourse(route.params.id, values).then(()=>{
        $toast.success('Güncelleme Başarılı')
        router.push({name:'courses', query:{reload:true}})
    }).catch((error)=>{
        $toast.error(error.message)
    }).finally(()=>{
        loading.value = false
    })
}

const updateEditor = (value) => {
    veditor.value = value
}
</script>