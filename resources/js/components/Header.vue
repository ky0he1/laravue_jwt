<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-md">
    <div class="container">
      <router-link class="navbar-brand" to="/">
          Laravue JWT
      </router-link>

      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="isLogin" class="navbar-nav ml-auto">
          <li><router-link class="nav-link" to="/">Top</router-link></li>
          <li><router-link class="nav-link" to="/user">User</router-link></li>
          <li><a class="nav-link" @click="logout">Logout</a></li>
        </ul>
        <ul v-else class="navbar-nav ml-auto">
          <li><router-link class="nav-link" to="/">Top</router-link></li>
          <li><router-link class="nav-link" to="/login">Login</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    }
  },

  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout', this.$store.getters['auth/token'])
      this.$router.push('/login')
    }
  }
}
</script>