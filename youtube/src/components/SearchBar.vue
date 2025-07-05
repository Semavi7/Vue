<template>
  <form class="searchForm" @submit.prevent="handleSubmit">
    <input class="searchInput" v-model="searchTerm" type="text">
    <button class="searchBtn">Ara</button>
  </form>
</template>

<script>
export default {
    emits:["termChange"],
    data() {
        return {
            searchTerm: ""
        }
    },
    methods: {
        handleSubmit(){
            this.$emit("termChange", this.searchTerm)
            this.searchTerm = ""
        }
    },
}
</script>

<style scoped>
    .searchForm{
        display: flex;
        margin: 20px 0px;
    }
    .searchInput{
        width: 85%;
        padding: 8px;
        margin-right: 20px;
        border-radius: 20px;
    }
    .searchBtn{
        width: 15%;
        border: none;
        background: green;
        color: white;
        border-radius: 20px;
        cursor: pointer;

    }
</style>