<template>
    <header>
        <div class="container headerContainer">
            <div class="brand">
                <router-link to="/">Can Boz</router-link>
            </div>
            <div class="routerDiv">
                <ul class="userAction">
                    <li v-if="!userStore.auth">
                        <router-link to="/signin">
                            Giriş Yap
                        </router-link>
                    </li>
                    <div class="userAuthAction" v-if="userStore.auth">
                        <li @click="userStore.signOut()">
                            Çıkış Yap
                        </li>
                        <li>
                            <router-link to="/user/dasboard">
                                Kullanıcı Sayfası
                            </router-link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore'
const userStore = useUserStore()
</script>