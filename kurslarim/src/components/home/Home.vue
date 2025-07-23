<template>
    <div class="container">
        <HomeCarousel />
        <HomeCourses />
    </div>
</template>
<script setup>
import { UseCourseStore } from '@/stores/courses';
import HomeCarousel from './HomeCarousel.vue';
import HomeCourses from './HomeCourses.vue';

const courseStore = UseCourseStore();
if (!courseStore.homeCourses) {
    courseStore.getCourses()
}


</script>