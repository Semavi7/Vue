<template>
  <div>
    <nav class="mainNav">
      <router-link to="/">Yapılacaklar Listesi</router-link>
      <router-link to="/addTask">Yeni Görev Ekle</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body{
  background: ghostwhite;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.mainNav{
  text-align: center;
  margin: 40px 0px;
}
.mainNav a{
  text-decoration: none;
  color: gray;
  font-size: 18px;
  margin: 0px 10px;
}
a.router-link-active{
  border-bottom: 2px solid green;
  padding-bottom: 4px;
}
</style>
