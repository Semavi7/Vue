<template>
    <div>
        <div v-if="loading" class="text-center m-3">
            <v-progress-circular indeterminate color="primary"/>
        </div>
        <div v-if="!loading">
            <h1>Kurs Ekle</h1>
            <hr>
            <Form :validation-schema="CourseSchema" @submit="onSubmit" class="mb-4">
                <div class="mb-4">
                    <Field name="category" v-slot="{ field, errors, errorMessage }">
                        <input type="email" class="form-control" placeholder="Lütfen Kategori Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }" />
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <Field name="title" v-slot="{ field, errors, errorMessage }">
                        <input type="text" class="form-control" placeholder="Lütfen Kurs Adı Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }" />
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <Field name="summary" v-slot="{ field, errors, errorMessage }">
                        <textarea type="text" class="form-control" placeholder="Lütfen Kurs Özeti Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }"></textarea>
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <Field name="rating" v-slot="{ field, errors, errorMessage }">
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
                    <Field name="img" v-slot="{ field, errors, errorMessage }">
                        <input type="text" class="form-control" placeholder="Lütfen Kurs Resmi Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }" />
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <div class="mb-4">
                    <TipTop @update="updateEditor"/>
                     <Field v-model="veditor" name="description" v-slot="{ field, errors, errorMessage }">
                        <input type="hidden" class="form-control" placeholder="Lütfen Kurs Resmi Giriniz" v-bind="field"
                            :class="{ 'is-invalid': errors.length !== 0 }" />
                        <div class="input-alert" v-if="errors.length !== 0">
                            {{ errorMessage }}
                        </div>
                    </Field>
                </div>
                <v-btn type="submit" variant="outlined">Kurs Ekle</v-btn>
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

const $toast = useToast()
const ratingArray = [0,1,2,3,4,5]

const courseStore = UseCourseStore()

const veditor = ref('')
const loading = ref(false)

const onSubmit = (values,{resetForm}) => {
    loading.value=true
    courseStore.addCourse(values).then(()=>{
        $toast.success('Kurs Eklendi')
    }).catch((error)=>{
        $toast.error(error.message)
    }).finally(()=>{
        loading.value=false
    })
}

const updateEditor = (value) => {
    veditor.value = value
}
</script>