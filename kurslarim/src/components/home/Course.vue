<template>
    <div class="container courseTap">
        <div v-if="loading">
            <v-progress-circular indeterminate color="primary" />
        </div>
        <div class="courseDiv" v-else>

            <div class="courseIC">
                <div class="courseImg" :style="{ backgroundImage: `url(${course.img})` }">
                    <div class="courseCategory">
                        {{ course.category }}
                    </div>
                </div>
            </div>
            <div class="courseContent">
                <div>Eğitmen <b>{{ course.owner.firstname }} {{ course.owner.lastname }}</b></div>
                <hr />
                <h1>{{ course.title }}</h1>
                <div v-html="course.description"></div>
                <div class="courseRating">
                    Kurs Puanı: <b>{{ course.rating }}/5</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { UseCourseStore } from '@/stores/courses';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const courseStore = UseCourseStore()
const route = useRoute()
const course = ref({})
const loading = ref(true)

courseStore.getCourseById(route.params.id).then((res) => {
    course.value = res
}).finally(() => {
    loading.value = false
})
</script>