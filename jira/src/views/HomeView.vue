<template>
  <div>
    <FilterTask :current="current" @filterChange="changeFilter"/>
    <div v-if="tasks.length">
      <div v-for="task in filteredTasks" :key="task.id">
        <SingleTask :task="task" @delete="handleDelete" @complete="handleComplete"/>
      </div>
    </div>
  </div>
</template>

<script>
import SingleTask from '@/components/SingleTask.vue';
import FilterTask from '../components/FilterTask.vue';



export default {
  name: 'HomeView',
  components: {
    SingleTask,
    FilterTask
  },
  data() {
    return {
      tasks:[],
      current:"all"
    }
  },
  mounted() {
    fetch("http://localhost:3000/tasks").then(res=>res.json()).then(data=>this.tasks=data).catch(err=>console.log(err.message))
  },
  methods: {
    handleDelete(id){
      this.tasks = this.tasks.filter(task => {
        return task.id !== id
      })
    },
    handleComplete(id){
      let myTask = this.tasks.find(task=>{
        return task.id === id
      })
      myTask.complete = !myTask.complete
    },
    changeFilter(filterValue){
      this.current = filterValue
    }
  },
  computed: {
    filteredTasks(){
      if(this.current === "completed"){
        return this.tasks.filter(task => task.complete)
      }
      if(this.current === "continue"){
        return this.tasks.filter(task => !task.complete)
      }
      return this.tasks
    }
  },
}
</script>
