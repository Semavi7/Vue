<template>
  <form @submit.prevent="handleSubmit()">
    <label>Başlık</label>
    <input type="text" v-model="title" required>
    <label>İş Detayı</label>
    <textarea v-model="details" required></textarea>
    <button>Güncelle</button>
  </form>
</template>

<script>
export default {
    props:["id"],
    data() {
        return {
            title: "",
            details: "",
            copmlete: false
        }
    },
    mounted() {
        fetch(`http://localhost:3000/tasks/${this.id}`).then(res=>res.json()).then(data=>{
            this.title = data.title,
            this.details = data.details,
            this.copmlete = data.copmlete
        }).catch(err=>console.log(err.message))
    },
    methods: {
        handleSubmit(){
            fetch(`http://localhost:3000/tasks/${this.id}`,{method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({title:this.title, details:this.details,copmlete:this.copmlete})}).then(() => {
                this.$router.push("/")
            }).catch(err=>console.log(err))
        }
    },
}
</script>

<style>

</style>