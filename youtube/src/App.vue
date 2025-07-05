<template>
  <div class="container">
    <h1 class="title">Youtube Uygulaması</h1>
    <SearchBar @termChange="onTermChange"/>
    <div class="detailDiv">
      <VideoDetail :video="selectedVideo"/>
      <VideoList @videoSelect="onVideoSelect" :videos="videos"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from './components/SearchBar.vue'
import VideoList from './components/VideoList.vue';
import VideoDetail from './components/VideoDetail.vue';


export default {
  name: 'App',
  components: {
    SearchBar,
    VideoList,
    VideoDetail
  },
  data() {
    return {
      videos:[],
      selectedVideo: null
    }
  },
  methods: {
    onTermChange(searchTerm){
      axios.get("https://www.googleapis.com/youtube/v3/search", {
        params:{
        part:"snippet",
        type:"video",
        key:"AIzaSyAAeZROmV-27ESWEhHiq2GNEG8FsVp-OEk",
        q:searchTerm
      }
      }).then(response => {
        this.videos = response.data.items
      }).catch(error => {
        console.log(error)
      })
    },
    onVideoSelect(video){
      this.selectedVideo = video
    }
  },
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.container{
  max-width: 1200px;
  width: 100%;
  margin: 50px auto;
}
.title{
  text-align: center;
}
.detailDiv{
  display: flex;
}
</style>
