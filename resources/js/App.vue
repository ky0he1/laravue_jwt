<template>
  <div>
    <Header />
    <div class="container">
      <div class="container mt-4 mb-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  components: {
    Header
  }
}
</script>