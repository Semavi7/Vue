<template>
  <nav class="filterNav">
    <button @click="updateFilter('all')" :class="{active:current === 'all'}">Hepsi</button>
    <button @click="updateFilter('completed')" :class="{active:current === 'completed'}">Tamamlandı</button>
    <button @click="updateFilter('continue')" :class="{active:current === 'continue'}">Devam Ediyor</button>
  </nav>
</template>

<script>
export default {
    emits:['filterChange'],
    props:["current"],
    methods: {
        updateFilter(filterValue){
            this.$emit('filterChange', filterValue)
        }
    },
}
</script>

<style>
.filterNav button{
    background: bisque;
    color: gray;
    display: inline-block;
    font-size: 15px;
    margin-right: 10px;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 5px 10px;
    text-transform: uppercase;
}
.active{
    color: black !important;
}
</style>