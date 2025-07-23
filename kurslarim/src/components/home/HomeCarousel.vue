<template>
    <div>
        <Carousel :items-to-show="1" :wrap-around="true" class="carouselTop">
            <Slide v-for="slide in courseStore.getHomeSlides" :key="slide.id">
                <div class="sliderMessage" :style="{background:`url(${slide.img})`}">
                    <div class="slideContent">
                        {{ slide.title }}
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { UseCourseStore } from '@/stores/courses';

const courseStore = UseCourseStore()
</script>