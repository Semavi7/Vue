<template>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-2 gb-light d-block collapse sidebar">
                <div>
                    <ul class="nav">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'dashboard'}" >
                                <v-icon icon="mdi-view-dashboard"/>
                                <span>Kullanıcı Sayfası</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'profile'}" >
                                <v-icon icon="mdi-account"/>
                                <span>Eğitmen</span>
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="userStore.user.isAdmin">
                            <router-link class="nav-link" :to="{name:'courses'}" >
                                <v-icon icon="mdi-note-outline"/>
                                <span>Kurslarım</span>
                            </router-link>
                        </li>
                         <li class="nav-item" v-if="userStore.user.isAdmin">
                            <router-link class="nav-link" :to="{name:'courses_add'}" >
                                <v-icon icon="mdi-note-edit-outline"/>
                                <span>Kurs Ekle</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="col-md-10 ms-auto px-4" style="margin-top: 150px;">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useUserStore } from '@/stores/useUserStore'
const userStore = useUserStore()
</script>