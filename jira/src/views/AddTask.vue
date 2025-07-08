<template>
  <form @submit.prevent="handleSubmit()">
    <label>Başlık</label>
    <input type="text" v-model="title" required>
    <label>İş Detayı</label>
    <textarea v-model="details" required></textarea>
    <button>Ekle</button>
  </form>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            details: "",
            uri: "http://localhost:3000/tasks/"
        }
    },
    methods: {
        handleSubmit(){
            let task = {
                id: Math.floor(Math.random()*10000),
                title: this.title,
                details: this.details,
                complete: false
            }
            fetch(this.uri,{method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(task)
            }).then(() => {
                this.$router.push("/")
            }).catch(err => console.log(err.message))
        }
    }
}
</script>

<style>
form{
    box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 20px;
    border-radius: 10px;
    background: white;
}
input{
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
}
textarea{
    width: 100%;
    outline: none;
    height: 100px;
    border-radius: 20px;
    padding: 10px;
    border: 1px solid gray;
}
label{
    margin: 20px 0px 10px 0px;
    display: block;
    color: gray;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
}
button{
    padding: 10px 30px;
    font-size: 18px;
    background: green;
    color: white;
    border: none;
    border-radius: 20px;
    margin: 20px auto;
    display: block;
    cursor: pointer;
}
</style>