<template>
  <div>
    <h1>User page!</h1>
    <div v-if="name && email">
      <h2>名前：{{ name }}</h2>
      <h2>メールアドレス：{{ email }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
    }
  },

  mounted() {
    axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${this.$store.getters['auth/token']}`
      }})
      .then(res => {
        this.name = res.data.name
        this.email = res.data.email
      })
      .catch(err => {
        this.$router.push('/login')
      })
  }
}
</script>
