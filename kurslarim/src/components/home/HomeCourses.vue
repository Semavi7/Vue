<template>
    <div class="row" style="margin-bottom: 20px;">
        <div class="col-md-4" style="margin-top: 20px;" v-for="course in courseStore.getHomeCourses" :key="course.id">
            <div class="card">
                <img :src="course.img" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">{{ course.title }}</h5>
                    <p class="card-text">{{ course.summary }}</p>
                    <router-link class="btn btn-primary" :to="{name:'course', params:{id:course.id}}">Kursu İncele</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { UseCourseStore } from '@/stores/courses';

const courseStore = UseCourseStore();
if (!courseStore.homeCourses) {
    courseStore.getCourses()
}


</script>